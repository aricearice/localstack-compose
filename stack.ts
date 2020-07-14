#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import logs = require('@aws-cdk/aws-logs');
import lambda = require('@aws-cdk/aws-lambda');
import { LambdaDestination } from '@aws-cdk/aws-logs-destinations';

interface TestStackProps extends cdk.StackProps {
  stackEnv: string
}

interface ServiceProps {
  name: string;
  port: number;
}

export class TestStack extends cdk.Stack {
  id: string;
  lambda: any;
  lambdaRole: any;

  constructor(scope: cdk.Construct, id: string, props: TestStackProps) {
    super(scope, id, props);

    this.id = id;

    this.lambdaRole = this.setupLambdaRole();

    this.lambda = this.setupLambda();
  }

  private setupLambdaRole() {
    const role = new iam.Role(this, 'lamba-execution-role', {
      roleName: `TestLambdaBasicExecutionRole`,
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambdaBasicExecutionRole')
      ]
    });

    return {
      role
    }
  }

  private setupLambda() {

    const logGroup = new logs.LogGroup(this, 'testLambdaLogs', {
      logGroupName: 'testLambdaLogs',
      retention: logs.RetentionDays.ONE_MONTH
    });
    const testLambda = new lambda.Function(this, 'testLambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      timeout: cdk.Duration.seconds(300),
      code: lambda.Code.fromInline('./lambda'),
      role: this.lambdaRole.role,
      logRetentionRole: this.lambdaRole.role
    });

    return
  }

}

const app = new cdk.App();

new TestStack(app, `Local`, {
  stackEnv: 'local',
  env: {
    region: 'us-east-1',
    account: '000000000000'
  }
});
