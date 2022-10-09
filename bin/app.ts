#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline';

const app = new cdk.App();

const pipelineAccount = '123456789012';
const pipelineRegion = 'us-east-1';

const pipelineStack = new PipelineStack( app, "AppPipeline", {
  env: { account: pipelineAccount, region: pipelineRegion },
  codeCommitRepoArn: 'arn:aws:codecommit:us-east-1:123456789012:app',
  codeCommitBranch: 'main',
  // githubAccountRepo: 'account/repo',
  // githubBranch: 'main',
  // githubConnectionArn: '' // CodeStart connection arn
} );

app.synth();