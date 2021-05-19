import * as cdk from '@aws-cdk/core';
import { LambdaFunction } from './lambda/lambda';
import { DynamoDB } from './dynamodb/dynamodb';
import { CloudWatchEvents } from './cloud-watch-events/cloud-watch-events'
export class OnCallNotifierStack extends cdk.Stack {


  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dynamoDB = new DynamoDB(this);
    const lambda = new LambdaFunction(this, dynamoDB);
    new CloudWatchEvents(this, lambda.fn)
  }

}
