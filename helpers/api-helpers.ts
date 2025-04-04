import { APIRequestContext } from '@playwright/test';
import { allure } from 'allure-playwright';
import { API_CONFIG } from '../config/api-config';

export class APIHelper {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async get(endpoint: string, params = {}) {
        await allure.step(`GET ${endpoint}`, async () => {
            await allure.attachment('Request Details', 
                JSON.stringify({
                    method: 'GET', 
                    url: API_CONFIG.baseURL + endpoint, 
                    headers: API_CONFIG.headers, 
                    params: params}), 'application/json');
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
                ...API_CONFIG.headers,
            }
        });
        return response;
    }

    async post(endpoint: string, data: any) {
        await allure.step(`POST ${endpoint}`, async () => {
            await allure.attachment(
                'Request Details', 
                JSON.stringify({
                    method: 'POST', 
                    url: API_CONFIG.baseURL + endpoint, 
                    headers: API_CONFIG.headers}), 'application/json');
            await allure.attachment(
                'Request Body', 
                JSON.stringify(data, null, 2), 
                'application/json'
            );
        });

        const response = await this.request.post(endpoint, {
            data,
            headers: {
                ...API_CONFIG.headers,
            }
        });
        return response;
    }

    async put(endpoint: string, data: any) {
        await allure.step(`PUT ${endpoint}`, async () => {
            await allure.attachment('Request Details', 
                JSON.stringify({
                    method: 'PUT', 
                    url: API_CONFIG.baseURL + endpoint, 
                    headers: API_CONFIG.headers}), 'application/json');
            await allure.attachment(
                'Request Body', 
                JSON.stringify(data, null, 2), 
                'application/json'
            );
        });

        const response = await this.request.put(endpoint, {
            data,
            headers: {
                ...API_CONFIG.headers,
            }
        });
        return response;
    }

    async delete(endpoint: string, params = {}) {
        await allure.step(`DELETE ${endpoint}`, async () => {
            await allure.attachment('Request Details', 
                JSON.stringify({
                    method: 'DELETE', 
                    url: API_CONFIG.baseURL + endpoint, 
                    headers: API_CONFIG.headers, 
                    params: params}), 'application/json');
            if (Object.keys(params).length > 0) {
                await allure.attachment(
                    'Query Parameters', 
                    JSON.stringify(params, null, 2), 
                    'application/json'
                );
            }
        });

        const response = await this.request.delete(endpoint, {
            params,
            headers: {
                ...API_CONFIG.headers,
            }
        });
        return response;
    }
}