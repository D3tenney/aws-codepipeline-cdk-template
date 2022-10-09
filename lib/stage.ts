import { RemovalPolicy, Stage, StageProps, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AppStack } from "./stacks/app-stack";

interface AppStageProps extends StageProps
{
    isProd: boolean;
    removalPolicy: RemovalPolicy;
}

export class AppStage extends Stage
{
    constructor ( scope: Construct, id: string, props: AppStageProps )
    {
        super( scope, id, props );

        const appStack = new AppStack( this, "AppStack", { removalPolicy: props.removalPolicy } );
        // simple example of using extended stack properties
        Tags.of( appStack ).add( 'prod', props.isProd ? 'True' : 'False' );
    }
}