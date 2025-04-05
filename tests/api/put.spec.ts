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
    const randomValidUserId = Math.floor(Math.random() * 100).toString();
    const randomInvalidUserId = (Math.floor(Math.random() * (10000 - 100 + 1)) + 100).toString();
    const putEndpoint = APIEndpoints.PUT_COMMENTS.replace('{id}', userId.toString());

    const putEndpointRandomUserId = APIEndpoints.PUT_COMMENTS.replace('{id}', randomValidUserId);
    const putEndpointInvalidUserId = APIEndpoints.PUT_COMMENTS.replace('{id}', randomInvalidUserId);

    const putDefaultBody = PutBodyTestDataGenerator.defaultPutRequestBody();
    const putRandomBodyData = PutBodyTestDataGenerator.generatePutResponceBody();
    const putEmptyBody = {};

    test.beforeEach(async ({ request }) => {
        apiHelper = new APIHelper(request);
    });

    test('[TC-PUT-001] Update new post with default data @smoke @regression @put @positive', async () => {
        allure.testCaseId('TC-PUT-001');
        // Add allure steps
        await allure.step('Send Post request to ' + putEndpoint, async () => {
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

    test('[TC-PUT-002] Update new post with random data @smoke @regression @put @positive', async () => {
        allure.testCaseId('TC-PUT-002');
        // Add allure steps
        await allure.step('Send Post request to ' + putEndpoint, async () => {
            const response = await apiHelper.put(putEndpoint, putRandomBodyData);
            
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
                expect(body.id).toEqual(userId);
                expect(body.title).toEqual(putRandomBodyData.title);
                expect(body.body).toEqual(putRandomBodyData.body);
                expect(body.userId).toEqual(putRandomBodyData.userId);

            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-PUT-003] Update new post with random data and userId @smoke @regression @put @positive', async () => {
        allure.testCaseId('TC-PUT-003');
        // Add allure steps
        await allure.step('Send Post request to ' + putEndpointRandomUserId, async () => {
            const response = await apiHelper.put(putEndpointRandomUserId, putRandomBodyData);
            
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
                expect(body.id).toEqual(parseInt(randomValidUserId));
                expect(body.title).toEqual(putRandomBodyData.title);
                expect(body.body).toEqual(putRandomBodyData.body);
                expect(body.userId).toEqual(putRandomBodyData.userId);

            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-PUT-004] Update new post with empty body and valid userId @smoke @regression @put @positive', async () => {
        allure.testCaseId('TC-PUT-004');
        // Add allure steps
        await allure.step('Send Post request to ' + putEndpointRandomUserId, async () => {
            const response = await apiHelper.put(putEndpointRandomUserId, putEmptyBody);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(StatusCodes.OK);
            });

            const body = await response.json() as PutRequestResponceBodyObject;

            await allure.step('Verify response body', async () => {
                // Verify response body contains required fields
                expect(body).toHaveProperty('id');

                // Verify response body fields types
                expect(typeof body.id).toBe('number');

                // Verify response body fields values
                expect(body.id).toEqual(parseInt(randomValidUserId));

            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-PUT-005] Update new post with default data and invalid userId @smoke @regression @put @positive', async () => {
        allure.testCaseId('TC-PUT-005');
        // Add allure steps
        await allure.step('Send Post request to ' + putEndpointInvalidUserId, async () => {
            const response = await apiHelper.put(putEndpointInvalidUserId, putEmptyBody);
            
            await allure.step('Verify response status is 500', async () => {
                expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-PUT-006] Update new post with empty body and invalid userId @smoke @regression @put @positive', async () => {
        allure.testCaseId('TC-PUT-006');
        // Add allure steps
        await allure.step('Send Post request to ' + putEndpointInvalidUserId, async () => {
            const response = await apiHelper.put(putEndpointInvalidUserId, putDefaultBody);
            
            await allure.step('Verify response status is 500', async () => {
                expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });
});