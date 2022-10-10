# Introduction
This project aims to provide an example of a functioning
CodePipeline, built with AWS CDK.

This example is based on the [AWS CDK Pipeline Docs](https://docs.aws.amazon.com/cdk/v2/guide/cdk_pipeline.html).

# Setup
To launch this pipeline, you'll want to clone this repository,
add in your own account numbers and repository details,
push the code to your own repo, and deploy the pipeline.

Once the pipeline has been deployed manually, you can 
update it by pushing changes to your repo without
running `cdk deploy` locally again.

## AWS Account
To deploy this pipeline, you'll need an AWS Account.
If you want to deploy stages into different accounts, you
may want to use [AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
to set up and administer those accounts.

Also, you'll need to install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
and [CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html). 

Create an IAM user with administrative privileges in each account. Use `aws configure` to set up
profiles for each account so you can bootstrap and deploy into those accounts. You'll need to
bootstrap each account with `cdk bootstrap aws://ACCOUNT_ID/REGION`. You may want to use
AWS CLI profiles to accomplish this.

## Code Changes
Update the account IDs in `bin/app.ts` (for where the code pipeline will be deployed)
and `lib/environments.ts` (for the stages).

If you're deploying to multiple accounts (ie stages have different accounts),
uncomment `crossAccountKeys: true` in `lib/pipeline.ts`

## CodeCommit

To create a codecommit repository, run `aws codecommit create-repository --repository-name <YOUR_REPO_NAME>`.
```bash
aws codecommit create-repository \
--repository-name <YOUR_REPO_NAME> \
--repository-description "Describes your Repo"
```

[CLI codecommit create-repository docs](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/codecommit/create-repository.html)

Note the repo Arn and the clone urls.

You'll need to update the `codeCommitRepoArn` parameter in `bin/app.ts`.

Depending on whether you want to use https or ssh for git, follow setup instructions
for [https](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-https-unixes.html)
or [ssh](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-ssh-unixes.html).


## Github
If you want to use a github repo, you can initialize it from the github gui.
You'll need to use AWS Codestar to create a github connection and note the
connection arn. [Docs](https://docs.aws.amazon.com/codepipeline/latest/userguide/connections-github.html).

This project is set up to use CodeCommit, but you can use github by uncommenting
and configuring the github options in `bin/app.ts` and `lib/pipeline.ts` and
commenting out or removing the CodeCommit options. 

## Git setup
```bash
# clone this repo
git clone https://github.com/D3tenney/aws-codepipeline-cdk-template.git
cd aws-codepipeline-cdk-template

# remote setup
rm -rf ./.git
git init
git add -A
git commit -m "initial commit"
git remote add upstream <your_repo_url>
git push upstream master:main
```
See this [article](https://jdhao.github.io/2018/05/16/git-push-local-to-remote/).

# Deployment
Run `npm install` to install packages.
Run `cdk synth` to synthesize cloudformation templates. This will create the cdk.out directory.
You can review the templates in the cdk.out directory.

Once you're satisfied with the changes you've made and committed and pushed them to your repo,
run `cdk deploy AppPipeline`. Remember to bootstrap your environments before attempting a
deployment.

Then check CodePipelines in the AWS console in the account where you deployed your pipeline.
You should be able to watch it build and manually approve the second stage.



# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
