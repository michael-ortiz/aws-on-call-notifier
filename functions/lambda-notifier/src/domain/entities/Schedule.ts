export class ScheduleInterface {
    readonly userId: string
    readonly startDate: string
    readonly endDate: string
}

export class Schedule {

    readonly userId: string
    readonly startDate: string
    readonly endDate: string

    constructor(schedule: ScheduleInterface) { 
        this.userId = schedule.userId
        this.startDate = schedule.startDate
        this.endDate = schedule.endDate
    }

    public isValid(): boolean {
        return !this
    }
}