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

    const postBodyDefault = TestDataGenerator.defaultPostRequestBody();
    const postBodyGenerated = TestDataGenerator.generatePostResponceBody();
    
    test.beforeEach(async ({ request }) => {
        apiHelper = new APIHelper(request);
    });


    test('Post new posts with default data @smoke @regression @positive @post', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getPostsEndpoint}', async () => {
            const response = await apiHelper.post(postEndpoint, postBodyDefault);
            
            await allure.step('Verify response status is 201', async () => {
                expect(response.status()).toBe(StatusCodes.CREATED);
            });

            const body = await response.json() as PostResponceBodyObjectModel;

            await allure.step('Verify response body', async () => {

            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('Post new posts with generated data @smoke @regression @positive @post', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getPostsEndpoint}', async () => {
            const response = await apiHelper.post(postEndpoint, postBodyGenerated);
            
            await allure.step('Verify response status is 201', async () => {
                expect(response.status()).toBe(StatusCodes.CREATED);
            });

            const body = await response.json() as PostResponceBodyObjectModel;

            await allure.step('Verify response body', async () => {
                
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