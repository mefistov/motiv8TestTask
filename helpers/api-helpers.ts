import { APIRequestContext } from '@playwright/test';
import { allure } from 'allure-playwright';

export class APIHelper {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async get(endpoint: string, params = {}) {
        await allure.step(`GET ${endpoint}`, async () => {
            if (Object.keys(params).length > 0) {
                await allure.attachment(
                    'Query Parameters', 
                    JSON.stringify(params, null, 2), 
                    'application/json'
                );
            }
        });

        const response = await this.request.get(endpoint, {
            params,
            headers: {
                ...this.getDefaultHeaders()
            }
        });
        return response;
    }

    async post(endpoint: string, data: any) {
        await allure.step(`POST ${endpoint}`, async () => {
            await allure.attachment(
                'Request Body', 
                JSON.stringify(data, null, 2), 
                'application/json'
            );
        });

        const response = await this.request.post(endpoint, {
            data,
            headers: {
                ...this.getDefaultHeaders()
            }
        });
        return response;
    }

    private getDefaultHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 