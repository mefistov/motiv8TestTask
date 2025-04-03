# Playwright API Automation Framework

A structured API testing framework using Playwright.


## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright:
```bash
npx playwright install
```

## Configuration

- `config/api-config.ts`: API configuration (base URL, headers)
- `config/api-endpoints.ts`: API endpoints enum
- `types/post-types.ts`: TypeScript interfaces for API responses

## Running Tests

Run all API tests:
```bash
npm run test:api
```

Run with debug mode:
```bash
npm run test:api:debug
```

Generate and view Allure report:
```bash
npm run allure:report
```

## Features

- TypeScript support
- Allure reporting
- Modular test structure
- Reusable API helpers
- Type definitions
- Environment configuration
- Detailed test reporting

## Test Examples

- GET /posts
- GET /posts/{id}
- GET /posts/{id}/comments
- POST /posts
- PUT /posts/{id}
- PATCH /posts/{id}
- DELETE /posts/{id}

## Best Practices

1. Keep tests independent
2. Use proper assertions
3. Implement proper error handling
4. Use environment variables for sensitive data
5. Follow TypeScript best practices
6. Add detailed test descriptions
7. Use Allure annotations for better reporting