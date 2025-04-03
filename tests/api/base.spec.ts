import { test, expect } from '@playwright/test';
import { APIHelper } from '../../helpers/API-Helpers';
import { allure } from 'allure-playwright'; 
import { APIEndpoints } from '../../config/API-Endpoints';
import { GetResponceObjectModel } from '../../models/GetResponceObjectModel';
import { GetResponceCommentObjectModel } from '../../models/GetResponceCommentObjectModel';

test.describe('GET Endpoints API tests', () => {
    let apiHelper: APIHelper;
    const userId = 1;
    const getPostsEndpoint = APIEndpoints.GET_POSTS;
    const getPostsEndpointInvalid = APIEndpoints.GET_POSTS + 'invalid';

    const getPostByIdEndpoint = APIEndpoints.GET_POST_BY_ID.replace('{id}', userId.toString());
    const getPostByIdEndpointInvalid = APIEndpoints.GET_POST_BY_ID.replace('{id}', 'invalid').replace('posts', 'postsinvalid');
    const getPostByIdEndpointInvalidId = APIEndpoints.GET_POST_BY_ID.replace('{id}', 'i404');

    const getPostByIdCommentsEndpoint = APIEndpoints.GET_POST_BY_ID_COMMENTS.replace('{id}', userId.toString());
    const getPostByIdCommentsEndpointInvalidPosts = APIEndpoints.GET_POST_BY_ID_COMMENTS.replace('{id}', 'invalid').replace('posts', 'postsinvalid');
    const getPostByIdCommentsEndpointInvalidComments = APIEndpoints.GET_POST_BY_ID_COMMENTS.replace('{id}', 'invalid').replace('comments', 'commentsinvalid');
    const getPostByIdCommentsEndpointInvalidId = APIEndpoints.GET_POST_BY_ID_COMMENTS.replace('{id}', 'i404');

    const getCommentsByPostIdEndpoint = APIEndpoints.GET_COMMENTS_BY_POST_ID.replace('{id}', userId.toString()); 
    const getCommentsByPostIdEndpointInvalid = APIEndpoints.GET_COMMENTS_BY_POST_ID.replace('{id}', userId.toString()).replace('comments', 'commentsinvalid');
    const getCommentsByPostIdEndpointInvalidId = APIEndpoints.GET_COMMENTS_BY_POST_ID.replace('{id}', 'i404');
    const getCommentsByPostIdEndpointInvalidQuieryParamiter = APIEndpoints.GET_COMMENTS_BY_POST_ID.replace('postId', 'postIdinvalid');

    
    test.beforeEach(async ({ request }) => {
        apiHelper = new APIHelper(request);
    });

    test('Get all posts @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getPostsEndpoint}', async () => {
            const response = await apiHelper.get(getPostsEndpoint);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(200);
            });

            const body = await response.json() as GetResponceObjectModel[];
            //console.log(body);
            await allure.step('Verify response body contains required fields', async () => {
                for(let bodyobj of body) {
                expect(bodyobj).toHaveProperty('userId');
                expect(bodyobj).toHaveProperty('id');
                expect(bodyobj).toHaveProperty('title');
                expect(bodyobj).toHaveProperty('body');

                expect(typeof bodyobj.userId).toBe('number');
                expect(typeof bodyobj.id).toBe('number');
                expect(typeof bodyobj.title).toBe('string');
                expect(typeof bodyobj.body).toBe('string');
                }
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('Get all posts with invalid endpoint @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getPostsEndpointInvalid}', async () => {
            const response = await apiHelper.get(getPostsEndpointInvalid);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(404);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });

    test('Get post by id @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getPostByIdEndpoint}', async () => {
            const response = await apiHelper.get(getPostByIdEndpoint);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(200);
            });

            const body = await response.json() as GetResponceObjectModel;
            //console.log(bodyobj);
            await allure.step('Verify response body contains required fields', async () => {
                expect(body).toHaveProperty('userId');
                expect(body).toHaveProperty('id');
                expect(body).toHaveProperty('title');
                expect(body).toHaveProperty('body');
                
                // Verify userId is equal to userId variable
                expect(body.userId).toStrictEqual(userId);

                // Verify id is equal to userId
                expect(typeof body.userId).toBe('number');
                expect(typeof body.id).toBe('number');
                expect(typeof body.title).toBe('string');
                expect(typeof body.body).toBe('string');
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('Get post by id invalid endpoint @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getPostByIdEndpointInvalid}', async () => {
            const response = await apiHelper.get(getPostByIdEndpointInvalid);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(404);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });

    test('Get post by id invalid id @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getPostByIdEndpointInvalidId}', async () => {
            const response = await apiHelper.get(getPostByIdEndpointInvalidId);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(404);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });

    test('Get by comments by id @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getPostByIdCommentsEndpoint}', async () => {
            const response = await apiHelper.get(getPostByIdCommentsEndpoint);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(200);
            });

            const body = await response.json() as GetResponceCommentObjectModel[];
            //console.log(body);
            await allure.step('Verify response body contains required fields', async () => {
                for(let bodyobj of body) {
                expect(bodyobj).toHaveProperty('postId');
                expect(bodyobj).toHaveProperty('id');
                expect(bodyobj).toHaveProperty('name');
                expect(bodyobj).toHaveProperty('email');
                expect(bodyobj).toHaveProperty('body');

                expect(typeof bodyobj.postId).toBe('number');
                expect(typeof bodyobj.id).toBe('number');
                expect(typeof bodyobj.name).toBe('string');
                expect(typeof bodyobj.email).toBe('string');
                expect(typeof bodyobj.body).toBe('string');
                }
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('Get comments by id: invalid endpoint path @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getPostByIdCommentsEndpointInvalidPosts}', async () => {
            const response = await apiHelper.get(getPostByIdCommentsEndpointInvalidPosts);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(404);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });

    test('Get comments by id: invalid endpoint @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getPostByIdCommentsEndpointInvalidComments}', async () => {
            const response = await apiHelper.get(getPostByIdCommentsEndpointInvalidComments);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(404);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });

    test('Get comments by id: invalid id @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getPostByIdCommentsEndpointInvalidId}', async () => {
            const response = await apiHelper.get(getPostByIdCommentsEndpointInvalidId);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(404);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });

    test('Get by comments by postId @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getCommentsByPostIdEndpoint}', async () => {
            const response = await apiHelper.get(getCommentsByPostIdEndpoint);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(200);
            });

            const body = await response.json() as GetResponceCommentObjectModel[];
            //console.log(body);
            await allure.step('Verify response body contains required fields', async () => {
                for(let bodyobj of body) {
                expect(bodyobj).toHaveProperty('postId');
                expect(bodyobj).toHaveProperty('id');
                expect(bodyobj).toHaveProperty('name');
                expect(bodyobj).toHaveProperty('email');
                expect(bodyobj).toHaveProperty('body');

                expect(typeof bodyobj.postId).toBe('number');
                expect(typeof bodyobj.id).toBe('number');
                expect(typeof bodyobj.name).toBe('string');
                expect(typeof bodyobj.email).toBe('string');
                expect(typeof bodyobj.body).toBe('string');
                }
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(body, null, 2), 
                'application/json'
            );
        });
    });

    test('Get comments by id: invalid id as query paramiter @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getCommentsByPostIdEndpointInvalidId}', async () => {
            const response = await apiHelper.get(getCommentsByPostIdEndpointInvalidId);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(404);
            });

            // Attach response to allure report
            await allure.attachment(
                'API Response', 
                JSON.stringify(response.status(), null, 2), 
                'application/json'
            );
        });
    });

    test('Get comments by id: invalid endpoint as query paramiter @smoke @regression', async () => {
        // Add allure steps
        await allure.step('Send GET request to {getCommentsByPostIdEndpointInvalid}', async () => {
            const response = await apiHelper.get(getCommentsByPostIdEndpointInvalid);
            
            await allure.step('Verify response status is 200', async () => {
                expect(response.status()).toBe(404);
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