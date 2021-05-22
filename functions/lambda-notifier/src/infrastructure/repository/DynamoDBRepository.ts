import { Schedule } from "../../domain/entities/Schedule";
import { DynamoDB } from 'aws-sdk'
import { User, UserAlerts } from "../../domain/entities/User";
import { DatabaseRepositoryInterface } from "../../application/interfaces/DatabaseRepositoryInterface";

export class DynamoDBRepository implements DatabaseRepositoryInterface {

    constructor(private client: DynamoDB.DocumentClient) {
        this.client = client;
    }

    async getSchedule(startDate: string): Promise<Schedule> {

        const params: DynamoDB.DocumentClient.GetItemInput = {
            Key: {
                "start_date": startDate
            },
            TableName: process.env.SCHEDULE_TABLE!
        };

        const { Item } = await this.client.get(params).promise();

        const schedule: Schedule = new Schedule({
            userId: Item!.user_id,
            startDate: Item!.start_date,
            endDate: Item!.end_date
        });

        return schedule;
    }

    async getUser(userId: string): Promise<User> {

        const params: DynamoDB.DocumentClient.GetItemInput = {
            Key: {
                "user_id": userId
            },
            TableName: process.env.USERS_TABLE!
        };

        const { Item } =  await this.client.get(params).promise();

        const user: User = new User({
            userId: Item!.user_id,
            name: Item!.name,
            phoneNumber: Item!.phone_number,
            emailAddress: Item!.email_address,
            alerts: new UserAlerts(Item!.alerts.sms, Item!.alerts.email),
        });

        return user;
    }
}