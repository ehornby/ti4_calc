import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';
import moment from 'moment';

// Look at switching out moment for Intl.DateTimeFormat

export async function main(event, context) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: "ti4",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            gameId: uuid.v1(),
            gameData: data.content,
            createdAt: moment().format('MMM Do YYYY')
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    }
    catch (e) {
        console.log(e);
        return failure({ status: false });
    }
}