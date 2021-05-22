/**
 * The configuration file that contains the basic settings for this project.
 * Please enter your details in every <CHANGE ME>.
 */
export const configurations = {

    /**
    * A cron expression, that denotes when the notification 
    * lambda should be triggered in GMT timezone.
    * 
    * The given expression gets execcuted every day at 14:00:00 GMT.
    */
    SCHEDULE_CRON_EXPRESSION: "0 14 * * ? *",

    /**
     * A DynamoDB table that stores the users data and contact information.
     */
    USERS_TABLE: "on_call_users",

    /**
     * A DynamoDB table that stores the on-call schedule.
     */
    SCHEDULE_TABLE: "on_call_schedule",

    /**
     * The source email address that should appear in the message.
     * 
     * Suggestion: 
     * Use <Sender Name>yourmail@mail.com format for better visualization.
     * 
     */
    SOURCE_EMAIL: "<CHANGE ME>",

    /**
     * The email message subjet for the notification
     */
    EMAIL_SUBJECT: "<CHANGE ME>",

    /**
     * The email body for the notification. Supports HTML.
     */
    EMAIL_BODY: "<CHANGE ME>",

    /**
     * The SMS message.
     */
    SMS_MESSAGE: "<CHANGE ME>"
}