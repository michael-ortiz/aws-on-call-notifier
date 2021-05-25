import {AWSError, SES, SNS} from 'aws-sdk'
import { PromiseResult } from 'aws-sdk/lib/request';
import { NotificationRepositoryInterface } from '../../application/interfaces/NotificationRepositoryInterface'

export class SESRepository implements NotificationRepositoryInterface {
 
    constructor(private ses : SES) {}

    notify(address: string, message: string, subject?: string) : Promise<PromiseResult<SES.SendEmailResponse, AWSError>> {
        
        const params : SES.SendEmailRequest = {
            Destination: {
              ToAddresses: [
                address
              ]
            },
            Message: {
              Subject: {
                  Charset: 'UTF-8',
                  Data: subject!
              },
              Body: { 
                Html: {
                 Charset: "UTF-8",
                 Data: message
                }
               }
              },
            Source: process.env.SOURCE_EMAIL!
          };

          // Create the promise and SES service object
          return this.ses.sendEmail(params).promise();
    }
}





