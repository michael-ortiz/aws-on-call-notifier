import { Schedule } from "../../domain/entities/Schedule";
import { User } from "../../domain/entities/User";
import { DatabaseRepositoryInterface } from "../interfaces/DatabaseRepositoryInterface";

export class GetUserUseCase {

    constructor(private schedule: Schedule, private repository: DatabaseRepositoryInterface) {}

    public async execute() : Promise<User> {

        return await this.repository.getUser(this.schedule.userId);  
    }
}