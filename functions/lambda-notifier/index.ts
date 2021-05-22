
import { SES, SNS, DynamoDB } from 'aws-sdk'
import { DynamoDBRepository } from './src/infrastructure/repository/DynamoDBRepository'
import { SESRepository } from './src/infrastructure/repository/SESRepository';
import { SNSRepository } from './src/infrastructure/repository/SNSRepository';
import { GetUserUseCase } from './src/application/usecases/GetUserUseCase';
import { GetScheduleUseCase } from './src/application/usecases/GetScheduleUseCase';
import { SendEmailUseCase } from './src/application/usecases/SendEmailUseCase';
import { SendSmsUseCase } from './src/application/usecases/SendSmsUseCase';
import { Schedule } from './src/domain/entities/Schedule';
import { User } from './src/domain/entities/User';


export const handler = async (event: any = {}): Promise<any> => {

    const dynamoDB: DynamoDBRepository = new DynamoDBRepository(new DynamoDB.DocumentClient());
    const ses: SESRepository = new SESRepository(new SES());
    const sns: SNSRepository = new SNSRepository(new SNS());

    const schedule: Schedule = await new GetScheduleUseCase(dynamoDB).execute();
    const user: User = await new GetUserUseCase(schedule, dynamoDB).execute();

    const didSendEmail: boolean = await new SendEmailUseCase(user, ses).execute();
    const didSendSms: boolean = await new SendSmsUseCase(user, sns).execute();

    return {
        user,
        schedule,
        sentNotifications: {
            email: didSendEmail,
            sms: didSendSms
        }
    }
}