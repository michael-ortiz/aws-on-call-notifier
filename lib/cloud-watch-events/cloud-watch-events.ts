import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { LambdaFunction as LambdaFunctionTarget } from '@aws-cdk/aws-events-targets';
import { Rule, Schedule } from '@aws-cdk/aws-events';

export class CloudWatchEvents {

    readonly rule: Rule

    constructor(scope: cdk.Construct, lambdaFunction: lambda.Function) {

        this.createScheduleCronRule(scope, lambdaFunction);
    }

    /**
     * Creates a Schedule DynamoDB table that will have a set of records containing
     * a start_date and end_date for a given user.
     * 
     * Uses GMT TimeZone.
     */
    private createScheduleCronRule(scope: cdk.Construct, lambdaFunction: lambda.Function): Rule {

        const rule: Rule = new Rule(scope, 'LambdaScheduleCronRule', {
            schedule: Schedule.cron({ minute: '0', hour: '8' }),
            targets: [new LambdaFunctionTarget(lambdaFunction)],
        });

        return rule;
    }
}