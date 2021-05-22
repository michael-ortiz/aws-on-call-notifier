import { Schedule } from "../../domain/entities/Schedule";
import { User } from "../../domain/entities/User";

export interface DatabaseRepositoryInterface {
    getSchedule(startDate : string) : Promise<Schedule>;
    getUser(userId : string) : Promise<User>;
}