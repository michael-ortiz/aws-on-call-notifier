export interface NotificationRepositoryInterface {
    notify(address: string) : Promise<any>
}