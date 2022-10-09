import * as cdk from 'aws-cdk-lib';

interface Environment
{
    readonly accountId: string;
    readonly name: string;
    readonly region: string;
    readonly isProd: boolean;
    readonly removalPolicy: cdk.RemovalPolicy;
}

const devEnvironment: Environment = { accountId: '123456789012', name: 'dev', region: 'us-east-1', isProd: false, removalPolicy: cdk.RemovalPolicy.DESTROY };

const prodEnvironment: Environment = { accountId: '123456789012', name: 'prod', region: 'us-east-1', isProd: true, removalPolicy: cdk.RemovalPolicy.RETAIN };

export const ALL_ENVIRONMENTS: Environment[] = [ devEnvironment, prodEnvironment ];
