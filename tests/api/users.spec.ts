import { test, expect } from '@playwright/test';
import { APIHelper } from '../../helpers/api-helpers';
import { allure } from 'allure-playwright'; 
import { APIEndpoints } from '../../config/api-endpoints';
import { GetResponceObjectModel } from '../../models/GetResponceObjectModel';

test.describe('Users API', () => {
    let apiHelper: APIHelper;
    const postsEndpoint = APIEndpoints.POSTS;


    test.beforeEach(async ({ request }) => {
        apiHelper = new APIHelper(request);
    });

    test('should get user details @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to /users/1', async () => {
            const response = await apiHelper.get(postsEndpoint);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(200);
            });

            const body = await response.json() as GetResponceObjectModel[];
            console.log(body);
            await allure.step('Verify response body contains required fields', async () => {
                expect(body[0]).toHaveProperty('userId');
                expect(body[0]).toHaveProperty('id');
                expect(body[0]).toHaveProperty('title');
                expect(body[0]).toHaveProperty('body');
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