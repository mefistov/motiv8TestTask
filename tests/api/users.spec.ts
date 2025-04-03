import { test, expect } from '@playwright/test';
import { APIHelper } from '../../helpers/api-helpers';
import { allure } from 'allure-playwright';

test.describe('Users API', () => {
    let apiHelper: APIHelper;

    test.beforeEach(async ({ request }) => {
        apiHelper = new APIHelper(request);
    });

    test('should get user details @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to /users/1', async () => {
            const response = await apiHelper.get('/users/1');
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(200);
            });

            const body = await response.json();
            await allure.step('Verify response body contains required fields', async () => {
                expect(body).toHaveProperty('id');
                expect(body).toHaveProperty('name');
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('should create new user @regression', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com'
        };

        await allure.step('Send POST request to create user', async () => {
            // Attach request body to allure report
            await allure.attachment(
                'Request Body', 
                JSON.stringify(userData, null, 2), 
                'application/json'
            );

            const response = await apiHelper.post('/users', userData);
            
            await allure.step('Verify response status is 201', async () => {
                expect(response.status()).toBe(201);
            });

            const body = await response.json();
            await allure.step('Verify created user details', async () => {
                expect(body).toHaveProperty('id');
                expect(body.name).toBe(userData.name);
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