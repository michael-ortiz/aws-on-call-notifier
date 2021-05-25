import {AWSError, SNS} from 'aws-sdk'
import { PromiseResult } from 'aws-sdk/lib/request';
import { NotificationRepositoryInterface } from '../../application/interfaces/NotificationRepositoryInterface';

export class SNSRepository implements NotificationRepositoryInterface {
 
    constructor(private sns: SNS) {}

    notify(phoneNumber: string, message: string): Promise<PromiseResult<SNS.PublishResponse, AWSError>> {

        var params = {
            Message: message,
            PhoneNumber: phoneNumber
          };
      
          return  this.sns.publish(params).promise();
    }
}