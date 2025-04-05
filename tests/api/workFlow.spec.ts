import { test, expect } from '@playwright/test';
import { APIHelper } from '../../helpers/API-Helpers';
import { allure } from 'allure-playwright'; 
import { APIEndpoints } from  '../../config/api-endpoints';
import { StatusCodes } from '../../config/status-codes';
import { PostResponceBodyObjectModel } from '../../models/PostResponceBodyObjectModel';
import { PostBodyTestDataGenerator } from '../../helpers/PostBodyTestDataGenerator';
import { PutRequestResponceBodyObject } from '../../models/PutRequest-ResponceBodyObject';
import nock from 'nock';
import { API_CONFIG } from '../../config/api-config';

test.describe('Test CRUD workflow API tests', () => {
    let apiHelper: APIHelper;

    const commentObject = PostBodyTestDataGenerator.generatePostResponceBody();
    (commentObject as any)['id'] = 0;

    let postEndpoint = APIEndpoints.POST_COMMENTS;
    let putEndpoint = APIEndpoints.PUT_COMMENTS.replace('{id}', commentObject.userId.toString());
    let getPostByIdEndpoint = APIEndpoints.GET_POST_BY_ID.replace('{id}', commentObject.userId.toString());
    const deletePostEndpoint = APIEndpoints.DELETE_COMMENT_BY_ID.replace('{id}', commentObject.toString());


    test.beforeEach(async ({ request }) => {
        apiHelper = new APIHelper(request);
    });

    test.afterEach(async () => {
        if (nock.isActive()) {
            if (!nock.isDone()) {
                 console.warn(`Nock interceptors not all used: ${nock.pendingMocks()}`);
            }
            nock.cleanAll();
            nock.restore();
        }
    });

    test('[TC-WF-001] Post new post with generated data @smoke @regression @post @positive', async () => {
        allure.testCaseId('TC-WF-001');

        await allure.step('Send Post request to ' + postEndpoint, async () => {
            const response = await apiHelper.post(postEndpoint, commentObject);
            
            await allure.step('Verify response status is 201', async () => {
                expect(response.status()).toBe(StatusCodes.CREATED);
            });

            const body = await response.json() as PostResponceBodyObjectModel;

            await allure.step('Verify response body', async () => {

                // Verify response body fields values
                expect(body.userId).toEqual(commentObject.userId);
                expect(body.title).toEqual(commentObject.title);
                expect(body.body).toEqual(commentObject.body);

            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-WF-002] Update new post with default data @smoke @regression @put @positive', async () => {
        allure.testCaseId('TC-WF-002');

        await allure.step(`Setup nock mock for PUT ${API_CONFIG.baseURL}${putEndpoint}`, async () => {
            nock(API_CONFIG.baseURL)
                .put(putEndpoint)
                .reply(StatusCodes.OK, commentObject);
            await allure.attachment(
               'Nock Mock Details',
               `Intercepting PUT ${API_CONFIG.baseURL}${putEndpoint}\nResponding with Status: ${StatusCodes.OK}\nResponding with Body:\n${JSON.stringify(commentObject, null, 2)}`,
               'text/plain'
            );
       });

        await allure.step('Send Post request to ' + putEndpoint, async () => {
            const response = await apiHelper.put(putEndpoint, commentObject);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(StatusCodes.OK);
            });

            const body = await response.json() as PutRequestResponceBodyObject;

            await allure.step('Verify response body', async () => {

                // Verify response body fields values
                expect(body.id).toEqual(commentObject.id!);
                expect(body.title).toEqual(commentObject.title);
                expect(body.body).toEqual(commentObject.body);
                expect(body.userId).toEqual(commentObject.userId);

            });
            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-WF-003] Get post by id @smoke @regression @get @positive', async () => {
        allure.testCaseId('TC-GET-003');

        await allure.step('Send GET request to ' + getPostByIdEndpoint, async () => {
            const response = await apiHelper.get(getPostByIdEndpoint);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(StatusCodes.OK);
            });

            const body = await response.json() as PostResponceBodyObjectModel;

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('[TC-WF-004] Delete comments by id @smoke @regression @delete @positive', async () => {
        allure.testCaseId('TC-WF-004');

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

});
