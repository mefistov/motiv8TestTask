import { test, expect } from '@playwright/test';
import { APIHelper } from '../../helpers/API-Helpers';
import { allure } from 'allure-playwright'; 
import { APIEndpoints } from  '../../config/api-endpoints';
import { StatusCodes } from '../../config/status-codes';
import { PutBodyTestDataGenerator } from '../../helpers/PutBodyTestDataGenerator';
import { PutRequestResponceBodyObject } from '../../models/PutRequest-ResponceBodyObject';

test.describe('PUT Endpoint API tests', () => {
    let apiHelper: APIHelper;
    const userId = 1;
    const putEndpoint = APIEndpoints.PUT_COMMENTS.replace('{id}', userId.toString());
    const putEndpointRandomUserId = APIEndpoints.PUT_COMMENTS.replace('{id}', Math.floor(Math.random() * 1000).toString());

    const putDefaultBody = PutBodyTestDataGenerator.defaultPutRequestBody();

    test.beforeEach(async ({ request }) => {
        apiHelper = new APIHelper(request);
    });

    test('Update new post with default data @smoke @regression @positive @put', async () => {
        // Add allure steps
        await allure.step('Send Post request to putEndpoint', async () => {
            const response = await apiHelper.put(putEndpoint, putDefaultBody);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(StatusCodes.OK);
            });

            const body = await response.json() as PutRequestResponceBodyObject;

            await allure.step('Verify response body', async () => {
                // Verify response body contains required fields
                expect(body).toHaveProperty('id');
                expect(body).toHaveProperty('title');
                expect(body).toHaveProperty('body');
                expect(body).toHaveProperty('userId');

                // Verify response body fields types
                expect(typeof body.id).toBe('number');
                expect(typeof body.title).toBe('string');
                expect(typeof body.body).toBe('string');
                expect(typeof body.userId).toBe('number');

                // Verify response body fields values
                expect(body.id).toEqual(putDefaultBody.id);
                expect(body.title).toEqual(putDefaultBody.title);
                expect(body.body).toEqual(putDefaultBody.body);
                expect(body.userId).toEqual(putDefaultBody.userId);

            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });
});