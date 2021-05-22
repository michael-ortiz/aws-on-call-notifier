import {AWSError, SES, SNS} from 'aws-sdk'
import { PromiseResult } from 'aws-sdk/lib/request';
import { NotificationRepositoryInterface } from '../../application/interfaces/NotificationRepositoryInterface'

export class SESRepository implements NotificationRepositoryInterface {
 
    constructor(private ses : SES) {}

    notify(emailAddress: string) : Promise<PromiseResult<SES.SendEmailResponse, AWSError>> {
        
        const params : SES.SendEmailRequest = {
            Destination: {
              ToAddresses: [
                emailAddress
              ]
            },
            Message: {
              Subject: {
                  Charset: 'UTF-8',
                  Data: process.env.EMAIL_SUBJECT!
              },
              Body: { 
                Html: {
                 Charset: "UTF-8",
                 Data: process.env.EMAIL_BODY!
                }
               }
              },
            Source: process.env.SOURCE_EMAIL!
          };

          // Create the promise and SES service object
          return this.ses.sendEmail(params).promise();
    }
}





