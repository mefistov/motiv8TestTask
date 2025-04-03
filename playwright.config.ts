import { PlaywrightTestConfig } from '@playwright/test';
import { API_CONFIG } from './config/api-config';

const config: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: 30000,
    use: {
        baseURL: API_CONFIG.baseURL,
        extraHTTPHeaders: API_CONFIG.headers,
    },
    reporter: [
        ['list'],
        ['allure-playwright', {
            detail: true,
            outputFolder: 'allure-results',
            suiteTitle: false
        }]
    ],
};

export default config; 