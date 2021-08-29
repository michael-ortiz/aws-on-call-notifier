import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as OnCallNotifier from '../lib/on-call-notifier-stack';

test('Expect DynamoDB Table', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new OnCallNotifier.OnCallNotifierStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource('AWS::DynamoDB::Table', {
      
    }));


});
