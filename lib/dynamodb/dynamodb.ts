import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { RemovalPolicy } from '@aws-cdk/core';
import { environmentProperties } from '../commons/properties'

export class DynamoDB {

    readonly usersTable: dynamodb.Table;
    readonly scheduleTable: dynamodb.Table;

    constructor(scope: cdk.Construct) {

        this.usersTable = this.createUsersTable(scope);
        this.scheduleTable = this.createScheduleTable(scope);
    }

    /**
     * A table that has all the registered users with the included contact, and alert conguration settings.
     */
    private createUsersTable(scope: cdk.Construct): dynamodb.Table {

        const table: dynamodb.Table = new dynamodb.Table(scope, 'UsersTable', {
            tableName: environmentProperties.USERS_TABLE,
            partitionKey: { name: 'user_id', type: dynamodb.AttributeType.STRING },
            removalPolicy: RemovalPolicy.DESTROY
        });

        return table;
    }

    /**
     * Creates a Schedule DynamoDB table that will have a set of records containing
     * a start_date and end_date for a given user.
     */
    private createScheduleTable(scope: cdk.Construct): dynamodb.Table {

        const table: dynamodb.Table = new dynamodb.Table(scope, 'ScheduleTable', {
            tableName: environmentProperties.SCHEDULE_TABLE,
            partitionKey: { name: 'start_date', type: dynamodb.AttributeType.STRING },
            removalPolicy: RemovalPolicy.DESTROY
        });

        return table;
    }
}