# 📣 On-Call-Notifier 💌



## ⛱ Summary

On-Call-Notifier is a small project that tries to automate the notification process for companies On-Call schedule for employees. The project is hosted in AWS and uses the following services to accomplish the notification delivery. This project uses CDK for Infrastructure as Code (IaC) and Clean Arquitecture pattern for the lambda code using TypeScript.



## 🏗 The Arquitecture



![](https://personal-public-bucket.s3.amazonaws.com/OnCallNotifierArquitecture.png)



Services used:

* **Cloud Watch Events**

  Invokes Lambda by using a Cron Schedule.

* **Lambda**

  Fetches schedule information and user information to send the notifications.

* **DynamoDB**

  Stores Users and Schedule for on-call. 

* **SES**

  AWS Service to send emails.

* **SNS**

  AWS Service to send notifications. In our case, SMS text messages.





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

Before you can start reciving notifications, you fill your on-call schedule. This project contains 2 main tables that contain vital information about the when and to who the notifications are going to be sent. The `db.json` contains the data that will be preloaded into the DynamoDB (non-relational) database. 



**File Location**:

````
/lib/dynamodb/data/db.json
````



### Structure

```json
{
    "table_name": [
        {   
            "PutRequest": {
                "Item": {
                  ...
                }
            }
        }
    ]
}
```



### Preview of db.json:

```json
{
    "on_call_users": [
        {   
            "PutRequest": {
                "Item": { 
                    "user_id": { "S": "1" },
                    "name": { "S": "Michael" },
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
    ],
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



## 🚀 Install & Deploy Instructions ⛅️



After passing all the previous stages, you must ensure the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and [CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html) are installed. 

As part of the configuration process, we need to make some adjustments to include the information required for notification.



Ensure you set your AWS Credentials. **If this is your first time**, please follow the following [instructions](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html):



In the project root folder, from your favorite Terminal, execute the following commands:

```shell
npm run build
cdk deploy
```



## Useful CDK commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
