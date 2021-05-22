export class IUser {
    readonly userId : string
    readonly name : string
    readonly phoneNumber : string
    readonly emailAddress : string
    readonly alerts : UserAlerts
}

export class User {

    readonly userId : string
    readonly name : string
    readonly phoneNumber : string
    readonly emailAddress : string
    readonly alerts : UserAlerts

    constructor(user: IUser) { 
        this.userId = user.userId
        this.name = user.name
        this.phoneNumber = user.phoneNumber
        this.emailAddress = user.emailAddress
        this.alerts = user.alerts 
    }

    isEmailActive() : boolean {
        return this.alerts.email
    }

    isSmsActive() : boolean {
        return this.alerts.sms
    }

    hasValidEmail() : boolean {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        return regex.test(this.emailAddress);
    }

    hasValidPhone() : boolean {
        const regex = /^\+?[1-9]\d{1,14}$/; 
        return regex.test(this.phoneNumber);
    }
}

export class UserAlerts {
    constructor(
        public sms: boolean, 
        public email: boolean
    ) { }
}