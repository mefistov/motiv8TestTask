import { test, expect } from '@playwright/test';
import { APIHelper } from '../../helpers/API-Helpers';
import { allure } from 'allure-playwright'; 
import { APIEndpoints } from  '../../config/api-endpoints';
import { StatusCodes } from '../../config/status-codes';

test.describe('DELETE Endpoint API tests', () => {
    let apiHelper: APIHelper;
    const userId = 1;
    const invalidUserId = 'i404';
    const deletePostEndpoint = APIEndpoints.DELETE_COMMENT_BY_ID.replace('{id}', userId.toString());
    const deletePostInvalidId = APIEndpoints.DELETE_COMMENT_BY_ID.replace('{id}', invalidUserId);
    const deletePostNoId = APIEndpoints.DELETE_COMMENT_BY_ID.replace('{id}', '');
    const deletePostEndpointInvalid = APIEndpoints.DELETE_COMMENT_BY_ID.replace('{id}', userId.toString()).replace('posts', 'postsinvalid');

    test.beforeEach(async ({ request }) => {
        apiHelper = new APIHelper(request);
    });

    test('[TC-DELETE-001] Delete comments by id @smoke @regression @delete @positive', async () => {
        allure.testCaseId('TC-DELETE-001');

        await allure.step('Send DELETE request to ' + deletePostEndpoint, async () => {
            const response = await apiHelper.delete(deletePostEndpoint);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(StatusCodes.OK);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-DELETE-002] Delete comments by id: invalid endpoint @smoke @regression @delete @negative', async () => {
        allure.testCaseId('TC-DELETE-002');

        await allure.step('Send DELETE request to ' + deletePostEndpointInvalid, async () => {
            const response = await apiHelper.delete(deletePostEndpointInvalid);
            
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

    test('[TC-DELETE-003] Delete comments by id: invalid id @smoke @regression @delete @negative', async () => {
        allure.testCaseId('TC-DELETE-003');

        await allure.step('Send DELETE request to ' + deletePostInvalidId, async () => {
            const response = await apiHelper.delete(deletePostInvalidId);
            
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

    test('[TC-DELETE-004] Delete comments by id: id not present @smoke @regression @delete @negative', async () => {
        allure.testCaseId('TC-DELETE-004');

        await allure.step('Send DELETE request to ' + deletePostNoId, async () => {
            const response = await apiHelper.delete(deletePostNoId);
            
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