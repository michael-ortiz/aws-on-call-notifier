import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as OnCallNotifier from '../lib/on-call-notifier-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new OnCallNotifier.OnCallNotifierStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
