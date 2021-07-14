# 🔔 On-Call Notifier 📩




## Summary Introduction

On-Call-Notifier is a small project will remind employees when their [On-Call](https://en.wikipedia.org/wiki/On-call) shift starts through email or text messages (SMS). This project is completely serverless (no need to manage or provision servers) and is hosted in AWS. We use AWS [CDK](https://aws.amazon.com/cdk/) to create the cloud infrastructure, and make use of [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) software design principles for the lambda code.




## 🏗 The Architecture



![](https://personal-public-bucket.s3.amazonaws.com/OnCallNotifierArquitecture.png)



**AWS Services used and what they are used for:**

* [**Cloud Watch Events**](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html)

  Invokes the *notifier lambda* automatically by using a cron expression. 

  https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents-expressions.html

* [**Lambda**](https://aws.amazon.com/lambda/)

  Fetches schedule information for the current date. If there is a `Schedule` Item, user information will be fetched, which then triggers the notification process to notify the employee or user.

* [**DynamoDB**](https://aws.amazon.com/dynamodb/)

  A non-relational database that will store the users and on-call schedule information. 

* [**SES**](https://aws.amazon.com/ses/)

  AWS Service used to send email notifications.

* [**SNS**](https://aws.amazon.com/sns)

  AWS Service used to send text messages (SMS) notifications.



## 🏎 Before we begin

Please follow the instructions until the end to fully configure this project. All steps are required for a full deployment.



## ⚙️ Project Settings Configuration

The `configurations.ts` file, contains the required configurations that you must enter in order to start sending notifications.

**File Location**:

````
lib/settings/configurations.ts
````



Be sure to enter your information on every `<CHANGE_ME>` as is required to begin sending notifications.



## 📚 Database Configuration

Before you can start receiving notifications, you fill your on-call schedule. This project contains 2 main DynamoDB (non-relational) tables that contain the information about  **when** and to **whom** the notifications are going to be sent. The `users.json` and `schedule.json` files contain the data that will be preloaded into the DynamoDB database.  Be sure to fill this with your respective information



**Files Location**:

````
/lib/dynamodb/data/users.json
/lib/dynamodb/data/schedule.json
````



### Users Data

`users.json`

This file should contain a list of all the users that can be notified. Their contact information must be present for them to receive a notification.  You can also disable a notification for a user if they prefer not to receive them initially.  Also, keep in mind that the `user_id` must be included in the `schedule.json` item as its used as a reference key.

```json
{
    "on_call_users": [
        {   
            "PutRequest": {
                "Item": { 
                    "user_id": { "S": "1" },
                    "name": { "S": "User Name" },
                    "phone_number": { "S": "+1XXX5550100" },
                    "email_address": { "S": "email@mail.com" },
                    "alerts": {
                        "M": {
                            "email": { "BOOL": true },
                            "sms": { "BOOL": true }
                        } 
                    }
                }
            }
        }
    ]
}
```



### Schedule Data

`schedule.json`

The schedule table contains the information about the start  and end dates of a user's on call shift. The user will be notified on the `start_date` when the lambda runs.

```json
{
  "on_call_schedule": [
        {   
            "PutRequest": {
                "Item": {
                    "user_id": { "S": "1" },
                    "start_date": { "S": "yyyy-mm-dd" },
                    "end_date": { "S": "yyyy-mm-dd" }
                }
            }
        }
    ]
}
```



### Schedule Item

```json
{
  "user_id": { "S": "1" },
  "start_date": { "S": "2021-05-20" },
  "end_date": { "S": "2021-05-20" }
}
```

---

`user_id`

A unique ID for the user or employee.

*Type:* `String`

----

`start_date`

The start date of the on-call shift in ISO 8601 date format.

*Type:* `String`

----

`end_date`

The end date of the on-call shift in ISO 8601 date format.

*Type:* `String`

----



### User Item

```json
{ 
  "user_id": { "S": "1" }, 
  "name": { "S": "User name" },
  "phone_number": { "S": "+1XXX5550100" },
  "email_address": { "S": "email@mail.com" }, 
  "alerts": {
    "M": {
      "email": { "BOOL": true },
      "sms": { "BOOL": true }
    } 
  }
}	
```

---

`user_id`

A unique ID for the user.

*Type:* `String`

----

`name`

The user's name.

*Type:* `String`

---

`phoneNumber`

E.164 format phone number.  The user will receive an SMS notification to this address if configured in the `alerts` section.

*Type:* `String`

---

`email_address`

A [verified](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses-procedure.html) email address. The user will receive a email notification to this address if configured in the `alerts` section.

*Supports*: `<Your Name>example@mail.com` format.

*Type:* `String`

---

`alerts`

The users alert preferences.

*Type:* `Map<String, Boolean>`

---



## ✅ Verify Email Address

In order to recieve email messages with the SES service, you must verify your email in your AWS Console.



Follow the instructions in the official documentation:

https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses-procedure.html



## 🚀 Install & Deploy Instructions ⛅️



After passing all the previous stages you are now ready to begin the deployment stage!



**Prerequisites**: 

If this is your first time using CDK, **please follow** the pre installation instruction in the official documentation.

https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_prerequisites



Next, in the project root folder, from your favorite Terminal, execute the following commands:

```shell
npm run build
cdk deploy
```



Once your deploy is successful, let's go ahead and load or user's data our DynamoDB table:

```shell
npm run load-users-data 
```



Now, close the execution output, and execute the next command:

```sh
npm run load-schedule-data
```



You can validate that everything is working fine by adding an Item into DynamoDB a Schedule Item where the `start_date` = your current date in `yyyy-mm-dd` format. Manually execute the lambda from the console.



## ⏳ Testing Locally



If you wish to run this project locally, you can do so by installing the [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html). You must make sure that the DynamoDB tables are loaded and there is at least an Item in the `on_call_schedule` table has an item where the `start_date` is your current date.



To configure the local environment variables required by the lambda, find the `local.json` file:

```
functions/lambda-notifier/local.json
```

 Mainly, you must change the `SOURCE_EMAIL` to your corresponding [**verified**](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses-procedure.html) email address.



Once everything is configured, run the following command to start the lambda:

```json
npm run start:local-lambda
```



Read more about running local lambdas here:

https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-invoke.html



## Useful CDK commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
