import { test, expect } from '@playwright/test';
import { APIHelper } from '../../helpers/API-Helpers';
import { allure } from 'allure-playwright'; 
import { APIEndpoints } from  '../../config/api-endpoints';
import { StatusCodes } from '../../config/status-codes';
import { PostResponceBodyObjectModel } from '../../models/PostResponceBodyObjectModel';
import { TestDataGenerator } from '../../helpers/TestDataGenerator';

test.describe('POST Endpoint API tests', () => {
    let apiHelper: APIHelper;

    const postEndpoint = APIEndpoints.POST_COMMENTS;
    const postEndpointInvalid = APIEndpoints.POST_COMMENTS.replace('posts', 'postsinvalid');

    const postBodyDefault = TestDataGenerator.defaultPostRequestBody();
    const postBodyGenerated = TestDataGenerator.generatePostResponceBody();
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


    test('Post new post with default data @smoke @regression @positive @post', async () => {
        // Add allure steps
        await allure.step('Send Post request to postEndpoint', async () => {
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

    test('Post new post with generated data @smoke @regression @positive @post', async () => {
        // Add allure steps
        await allure.step('Send Post request to postEndpoint', async () => {
            const response = await apiHelper.post(postEndpoint, postBodyGenerated);
            
            await allure.step('Verify response status is 201', async () => {
                expect(response.status()).toBe(StatusCodes.CREATED);
            });

            const body = await response.json() as PostResponceBodyObjectModel;

            await allure.step('Verify response body', async () => {
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

    test('Post new post with empty body parameters @smoke @regression @positive @post @negative', async () => {
        // Add allure steps
        await allure.step('Send GET request to getPostsEndpoint', async () => {
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

    test('Post new post with empty body @smoke @regression @positive @post @negative', async () => {
        // Add allure steps
        await allure.step('Send GET request to getPostsEndpoint', async () => {
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

    test('Post new post with invalid body parameters types @smoke @regression @positive @post @negative', async () => {
        // Add allure steps
        await allure.step('Send GET request to getPostsEndpoint', async () => {
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

    test('Post new post with invalid endpoint value and default body @smoke @regression @positive @post @negative', async () => {
        // Add allure steps
        await allure.step('Send GET request to getPostsEndpoint', async () => {
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