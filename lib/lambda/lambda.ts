import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as path from 'path';

import { environmentProperties } from '../commons/properties'
import { Policy, PolicyStatement, Effect } from '@aws-cdk/aws-iam';
import { DynamoDB } from '../dynamodb/dynamodb';

export class LambdaFunction {

    readonly fn: lambda.Function;

    constructor(scope: cdk.Construct, db: DynamoDB) {
        // Create Lambda
        this.fn = this.createLambdaFunction(scope);

        // Attach the permissions to the service lambda.
        this.attachPermissions(scope, this.fn, db);
    }

    private attachPermissions(scope: cdk.Construct, fn: lambda.Function, db: DynamoDB) {
        this.attachSNSPermissions(scope, fn);
        this.attachSESPermissions(scope, fn);

        db.scheduleTable.grantReadData(fn);
        db.usersTable.grantReadData(fn);
    }

    private createLambdaFunction(scope: cdk.Construct): lambda.Function {

        const fn: lambda.Function = new lambda.Function(scope, 'LambdaFunction', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, '../../functions/lambda-notifier')),
            environment: environmentProperties
        });

        return fn;
    }

    private attachSNSPermissions(scope: cdk.Construct, lambdaFunction: lambda.Function): void {

        const policy: Policy = new Policy(scope, "SNSPolicy", {
            statements: [
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: ["sns:Publish"],
                    resources: ["*"]
                })
            ]
        });

        lambdaFunction.role?.attachInlinePolicy(policy);

    }

    private attachSESPermissions(scope: cdk.Construct, lambdaFunction: lambda.Function): void {

        const policy: Policy = new Policy(scope, "SESPolicy", {
            statements: [
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: ["ses:SendEmail"],
                    resources: ["*"]
                })
            ]
        });

        lambdaFunction.role?.attachInlinePolicy(policy);
    }

}