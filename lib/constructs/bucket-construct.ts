import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";

interface PreferredBucketProps
{
    readonly removalPolicy: cdk.RemovalPolicy;
    readonly autoDeleteS3: boolean;
};

export class PreferredBucket extends Construct
{
    readonly bucket: cdk.aws_s3.Bucket;

    constructor ( scope: Construct, id: string, props: PreferredBucketProps )
    {
        super( scope, id );

        this.bucket = new cdk.aws_s3.Bucket( this, "Bucket", {
            encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
            accessControl: cdk.aws_s3.BucketAccessControl.PRIVATE,
            blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
            eventBridgeEnabled: false,
            objectOwnership: cdk.aws_s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
            publicReadAccess: false,
            transferAcceleration: false,
            versioned: false,
            removalPolicy: props.removalPolicy,
            autoDeleteObjects: props.autoDeleteS3
        } );
    }
}