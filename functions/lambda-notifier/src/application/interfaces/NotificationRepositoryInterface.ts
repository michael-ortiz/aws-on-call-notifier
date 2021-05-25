export interface NotificationRepositoryInterface {
    notify(address: string, message: string, subject?: string) : Promise<any>
}