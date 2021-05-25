export const EmailMessageTemplate = {
    "subject" : process.env.EMAIL_SUBJECT!,
    "htmlBody" : process.env.EMAIL_BODY!
}

export const SmsMessageTemplate = {
    "message" : process.env.SMS_MESSAGE!,
}