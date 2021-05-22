import { Schedule } from "../../domain/entities/Schedule";
import { DatabaseRepositoryInterface } from "../interfaces/DatabaseRepositoryInterface";

export class GetScheduleUseCase {

    constructor(private repository: DatabaseRepositoryInterface) {}

    public async execute() : Promise<Schedule> {

        return await this.repository.getSchedule(this.getISOSystemDate());  
    }

    private getISOSystemDate(): string {
        return new Date().toISOString().slice(0, 10);
    }
}