import { test, expect } from '@playwright/test';
import { APIHelper } from '../../helpers/API-Helpers';
import { allure } from 'allure-playwright'; 
import { APIEndpoints } from  '../../config/api-endpoints';
import { StatusCodes } from '../../config/status-codes';
import { PostResponceBodyObjectModel } from '../../models/PostResponceBodyObjectModel';
import { PostBodyTestDataGenerator } from '../../helpers/PostBodyTestDataGenerator';

test.describe('POST Endpoint API tests', () => {
    let apiHelper: APIHelper;

    const postEndpoint = APIEndpoints.POST_COMMENTS;
    const postEndpointInvalid = APIEndpoints.POST_COMMENTS.replace('posts', 'postsinvalid');

    const postBodyDefault = PostBodyTestDataGenerator.defaultPostRequestBody();
    const postBodyGenerated = PostBodyTestDataGenerator.generatePostResponceBody();

    const postEmptyBodyProperties = {
        title: '',
        body: '',
        userId: ''
    };
    const postEmptyBody = {};
    const postBodyInvalidPropertysTypes = {
        title: 123,
        body: 123,
        userId: 'test'

    };
    
    test.beforeEach(async ({ request }) => {
        apiHelper = new APIHelper(request);
    });


    test('[TC-POST-001] Post new post with default data @smoke @regression @post @positive', async () => {
        allure.testCaseId('TC-POST-001');

        await allure.step('Send Post request to ' + postEndpoint, async () => {
            const response = await apiHelper.post(postEndpoint, postBodyDefault);
            
            await allure.step('Verify response status is 201', async () => {
                expect(response.status()).toBe(StatusCodes.CREATED);
            });

            const body = await response.json() as PostResponceBodyObjectModel;

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
                expect(body.userId).toEqual(postBodyDefault.userId);
                expect(body.title).toEqual(postBodyDefault.title);
                expect(body.body).toEqual(postBodyDefault.body);

            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-POST-002] Post new post with generated data @smoke @regression @post @positive', async () => {
        allure.testCaseId('TC-POST-002');

        await allure.step('Send Post request to ' + postEndpoint, async () => {
            const response = await apiHelper.post(postEndpoint, postBodyGenerated);
            
            await allure.step('Verify response status is 201', async () => {
                expect(response.status()).toBe(StatusCodes.CREATED);
            });

            const body = await response.json() as PostResponceBodyObjectModel;

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
                expect(body.userId).toEqual(postBodyGenerated.userId);
                expect(body.title).toEqual(postBodyGenerated.title);
                expect(body.body).toEqual(postBodyGenerated.body);

            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-POST-003] Post new post with empty body parameters @smoke @regression @positive @post @negative', async () => {
        allure.testCaseId('TC-POST-003');

        await allure.step('Send GET request to '+ postEndpoint, async () => {
            const response = await apiHelper.post(postEndpoint, postEmptyBodyProperties);
            
            await allure.step('Verify response status is 422', async () => {
                expect(response.status()).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-POST-004] Post new post with empty body @smoke @regression @positive @post @negative', async () => {
        allure.testCaseId('TC-POST-004');

        await allure.step('Send GET request to ' + postEndpoint, async () => {
            const response = await apiHelper.post(postEndpoint, postEmptyBody);
            
            await allure.step('Verify response status is 422', async () => {
                expect(response.status()).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-POST-005] Post new post with invalid body parameters types @smoke @regression @positive @post @negative', async () => {
        allure.testCaseId('TC-POST-005');

        await allure.step('Send GET request to ' + postEndpoint, async () => {
            const response = await apiHelper.post(postEndpoint, postBodyInvalidPropertysTypes);
            
            await allure.step('Verify response status is 422', async () => {
                expect(response.status()).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-POST-006] Post new post with invalid endpoint value and default body @smoke @regression @positive @post @negative', async () => {
        allure.testCaseId('TC-POST-006');

        await allure.step('Send GET request to ' + postEndpointInvalid, async () => {
            const response = await apiHelper.post(postEndpointInvalid, postBodyDefault);
            
            await allure.step('Verify response status is 404', async () => {
                expect(response.status()).toBe(StatusCodes.NOT_FOUND);
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