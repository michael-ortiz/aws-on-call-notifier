import {AWSError, SNS} from 'aws-sdk'
import { PromiseResult } from 'aws-sdk/lib/request';
import { NotificationRepositoryInterface } from '../../application/interfaces/NotificationRepositoryInterface';

export class SNSRepository implements NotificationRepositoryInterface {
 
    constructor(private sns: SNS) {}

    notify(phoneNumber: string): Promise<PromiseResult<SNS.PublishResponse, AWSError>> {

        var params = {
            Message: process.env.SMS_MESSAGE!,
            PhoneNumber: phoneNumber
          };
      
          return  this.sns.publish(params).promise();
    }
}