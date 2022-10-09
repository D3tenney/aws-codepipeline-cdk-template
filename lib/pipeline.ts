import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { ALL_ENVIRONMENTS } from './environments';
import { AppStage } from './stage';

interface PipelineStackProps extends cdk.StackProps
{
    readonly codeCommitRepoArn: string;
    readonly codeCommitBranch: string;
    // readonly githubAccountRepo: string;
    // readonly githubBranch: string;
    // readonly githubConnectionArn: string;
}


export class PipelineStack extends cdk.Stack
{
    constructor ( scope: Construct, id: string, props: PipelineStackProps )
    {
        super( scope, id, props );

        const codeCommitRepo = cdk.aws_codecommit.Repository.fromRepositoryArn( this, "CodeCommitRepo", props.codeCommitRepoArn );

        const pipeline = new CodePipeline( this, "Pipeline", {
            pipelineName: "AppPipeline",
            // crossAccountKeys: true, // needed for cross-account deployments
            synth: new ShellStep( 'Synth', {
                // input: CodePipelineSource.connection( props.githubAccountRepo, props.githubBranch, {
                //     connectionArn: props.githubConnectionArn
                // } ),
                input: CodePipelineSource.codeCommit( codeCommitRepo, props.codeCommitBranch ),
                installCommands: [ 'npm install -g aws-cdk' ],
                commands: [ 'cd bin', 'npm ci', 'npm run build', 'cd ..', 'npx cdk synth' ],
                primaryOutputDirectory: 'cdk.out'
            } )
        } );

        for ( var environment of ALL_ENVIRONMENTS )
        {
            const stage = pipeline.addStage( new AppStage( this, `Stage-${ environment.name }`, {
                env: { account: environment.accountId, region: environment.region },
                isProd: environment.isProd,
                removalPolicy: environment.removalPolicy
            } ) );

            if ( environment.isProd )
            {
                stage.addPre( new ManualApprovalStep( 'approval' ) );
            }
        }
    }
}