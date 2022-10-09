import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PreferredBucket } from '../constructs/bucket-construct';

interface AppStackProps extends cdk.StackProps
{
  readonly removalPolicy: cdk.RemovalPolicy;
}

export class AppStack extends cdk.Stack
{
  constructor ( scope: Construct, id: string, props: AppStackProps )
  {
    super( scope, id, props );

    const autoDeleteObjects = props.removalPolicy == cdk.RemovalPolicy.DESTROY ? true : false;

    const bucket = new PreferredBucket( this, "Bucket", {
      removalPolicy: props.removalPolicy,
      autoDeleteS3: autoDeleteObjects
    } );
    new cdk.CfnOutput( this, "BucketName", { value: bucket.bucket.bucketName } );
  }
}
