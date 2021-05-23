# 📣 On-Call-Notifier 💌




## Summary Intruduction

On-Call-Notifier is a small project will remind employees when thie On-Call shift starts through email or mobile phone text messages (SMS). The project is completely serverless (no need to manage or provision servers) and is hosted in AWS. The project uses CDK for Infrastructure as Code (IaC) and Clean Arquitecture pattern for the processing lambda using TypeScript with Node.js.


## 🏗 The Arquitecture



![](https://personal-public-bucket.s3.amazonaws.com/OnCallNotifierArquitecture.png)



**Services used and what they are used for:**

* **Cloud Watch Events**

  Invokes the notification Lambda by using a Cron Schedule.

* **Lambda**

  Fetches schedule informationn for the current date. If there is a Schedule Item, user information will be fetched, which then triggers the notification process to notify the employee or user.

* **DynamoDB**

  Stores User information and schedule data for on-call. 

* **SES**

  AWS Service used to send email notifications.

* **SNS**

  AWS Service used to to send text messages (SMS) notifications.





## 🏎 Before we begin

Please follow the instructions until the end to fully configure this project. All steps are required for a full deployment.



## ⚙️ Project Settings Configuration

The `configuration.ts` file, contains the required configurations that you must enter in order to start sending notifications.

**File Location**:

````
lib/settings/configurations.ts
````



Be sure to enter your information on every `<CHANGE_ME>` as is required to begin sending notifications.



## 📚 Database Configuration

Before you can start reciving notifications, you fill your on-call schedule. This project contains 2 main tables that contain vital information about the when and to who the notifications are going to be sent. The `users.json` and `schedule.json` contains the data that will be preloaded into the DynamoDB (non-relational) database. Please ensure to fill this with your resepctive information.



**Files Location**:

````
/lib/dynamodb/data/user.json
/lib/dynamodb/data/schedule.json
````



### User

`users.json`

This file should contain a list of all the users that can be notified. Their contact information must be present for them to recieve a notifaction.  You can also disable a notification for a user if they prefer not to recieve them initially.  Also, keep in mind that the `user_id` must be included in the `schedule.js` item as its used as a reference key.

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



### Schedule

`schedule.json`



The schedule table contains the information about the start date and end date of a user's on call responsability. The user will be notified on the `start_date` when the lambda runs.

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



### Schedule Object Example

```json
{
  "user_id": { "S": "1" },
  "start_date": { "S": "2021-05-20" },
  "end_date": { "S": "2021-05-20" }
}
```

---

`user_id`

A unique ID for the user.

*Type:* `String`

----

`start_date`

The start date of the on-call duty in ISO 8601 date format.

*Type:* `String`

----

`end_date`

The end date of the on-call duty in ISO 8601 date format.

*Type:* `String`

----



### User Object Example

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

Valid email address. The user will receive a email notification to this address if configured in the `alerts` section.

*Supports*: `<Your Name>example@mail.com` format.

*Type:* `String`

---

`alerts`

The users alert preference.

*Type:* `Map<String, Boolean>`

---



## ✅ Verify Email Address

In order to recieve email messages with the SES service, you must verify your email in your AWS Console.



Follow the instructions in the official documentation:

https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses-procedure.html



## 🚀 Install & Deploy Instructions ⛅️



After passing all the previous stages, you must ensure the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and [CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html) are installed. 

As part of the configuration process, we need to make some adjustments to include the information required for notification.



Ensure you set your AWS Credentials. **If this is your first time**, please follow the following [instructions](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html):



In the project root folder, from your favorite Terminal, execute the following commands:

```shell
npm run build
cdk deploy
```



Once your deploy is successful, let's go ahead and load or user's data our DynamoDB table:

```shell
npm run load-users-data 
```



Once it processes, close the execution, and execute the next command to load the schedule data:

```sh
npm run load-schedule-data
```



You can validate that everything is working fine by loading into DynamoDB, a Schedule Item where the `start_date` equlals your current date in `yyyy-mm-dd` format and manually executing the lambda from the console.



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
