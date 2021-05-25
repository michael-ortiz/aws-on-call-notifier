import { User } from "../../domain/entities/User";
import { NotificationRepositoryInterface } from "../interfaces/NotificationRepositoryInterface";
import { SmsMessageTemplate } from "../templates/MessageTemplates";

export class SendSmsUseCase {

    constructor(private user: User, private repository: NotificationRepositoryInterface) {}

    public async execute() : Promise<boolean> {

        if(!this.user.isSmsActive()) {
            return false;
        }
        
        if(!this.user.hasValidPhone()) {
            console.log(`UserId: ${this.user.userId}, has an invalid phone number.`);
            return false;
        }

        await this.repository.notify(this.user.phoneNumber, SmsMessageTemplate.message);

        return true;
    }
}