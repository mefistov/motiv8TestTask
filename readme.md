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


# API Test Suite Description

## Posts API Tests

### GET Endpoints
1. **Get All Posts**
   - Endpoint: GET /posts
   - Description: Retrieves all posts
   - Expected Status: 200
   - Validates: Array of posts with required fields

2. **Get Post by ID**
   - Endpoint: GET /posts/{id}
   - Description: Retrieves a specific post by ID
   - Expected Status: 200
   - Validates: Post object structure and values

3. **Get Post Comments**
   - Endpoint: GET /posts/{id}/comments
   - Description: Retrieves comments for a specific post
   - Expected Status: 200
   - Validates: Array of comments

4. **Get Comments by Post ID**
   - Endpoint: GET /comments?postId={id}
   - Description: Retrieves comments filtered by post ID
   - Expected Status: 200
   - Validates: Filtered comments array

### POST Endpoints
1. **Create New Post**
   - Endpoint: POST /posts
   - Description: Creates a new post
   - Expected Status: 201
   - Validates: Created post structure and values

### PUT Endpoints
1. **Update Post with Default Data**
   - Endpoint: PUT /posts/{id}
   - Description: Updates existing post with default data
   - Expected Status: 200
   - Validates: Updated post structure and values

2. **Update Post with Random Data**
   - Endpoint: PUT /posts/{id}
   - Description: Updates existing post with random data
   - Expected Status: 200
   - Validates: Updated post with random values

3. **Update Post with Random User ID**
   - Endpoint: PUT /posts/{id}
   - Description: Updates post with random valid user ID
   - Expected Status: 200
   - Validates: Updated post with random user ID

4. **Update Post with Empty Body**
   - Endpoint: PUT /posts/{id}
   - Description: Updates post with empty request body
   - Expected Status: 200
   - Validates: Minimal response structure

5. **Update Post with Invalid User ID**
   - Endpoint: PUT /posts/{id}
   - Description: Attempts to update post with invalid user ID
   - Expected Status: 500
   - Validates: Error response

### DELETE Endpoints
1. **Delete Existing Post**
   - Endpoint: DELETE /posts/{id}
   - Description: Deletes an existing post
   - Expected Status: 200
   - Validates: Successful deletion

2. **Delete Non-existent Post**
   - Endpoint: DELETE /posts/{id}
   - Description: Attempts to delete a non-existent post
   - Expected Status: 404
   - Validates: Not Found error response

### Error Handling Tests
1. **404 Not Found**
   - Endpoint: Various endpoints with invalid IDs
   - Description: Tests non-existent resource handling
   - Expected Status: 404
   - Validates: Error response structure


## Test Categories
- @smoke: Basic functionality tests
- @regression: Comprehensive test coverage
- @positive: Happy path scenarios
- @negative: Error handling scenarios

## Test Data
- Default data: Standard test data
- Random data: Dynamically generated test data
- Empty data: Minimal request body
- Invalid data: Out of range or malformed data

## Validation Points
1. Response Status Codes
2. Response Body Structure
3. Field Types
4. Field Values
5. Error Handling
6. Data Integrity

## Continuous Integration (CI) with GitHub Actions

This project uses GitHub Actions (`.github/workflows/playwright.yml`) to automatically run the Playwright test suite. This ensures that tests pass whenever changes are pushed or proposed via pull requests.

### How it Works

**Triggers:**

The workflow is configured to run automatically on:

*   Any `push` event to any branch in the repository.
*   Any `pull_request` event (when a pull request is opened, synchronized, or reopened) targeting any branch.

**Workflow Steps:**

The workflow defines a single job named `build` that runs on an `ubuntu-latest` runner and performs the following steps:

1.  **Checkout Repository (`actions/checkout@v4`):** Downloads the latest code from your repository onto the runner.
2.  **Set up Node.js (`actions/setup-node@v4`):** Installs Node.js.
    *   It also enables caching for `npm` dependencies to speed up installations in subsequent runs.
3.  **Install Dependencies (`npm install`):** Installs all the project dependencies listed in `package.json` and `package-lock.json`.
4.  **Install Playwright Browsers (`npx playwright install --with-deps`):** Downloads the browser binaries (Chromium, Firefox, WebKit) required by Playwright and installs necessary operating system dependencies on the runner.
5.  **Run Playwright Tests (`npx playwright test`):** Executes the test suite using the default Playwright command. This step generates the raw test results needed for reporting (including `allure-results` if configured).
6.  **Generate Allure Report (`npm run allure:generate`):** Runs the `allure:generate` script from `package.json` to process the raw results (from `allure-results/`) and create the interactive HTML Allure report in the `allure-report/` directory. This step runs even if the previous test step failed (`if: always()`), allowing you to inspect the report for failures.
7.  **Upload Allure Report Artifact (`actions/upload-artifact@v4`):** Uploads the generated `allure-report/` directory as a workflow artifact named `allure-report`. This allows you to download the full report from the workflow run summary page. The artifact is kept for 5 days and is uploaded even if tests failed (`if: always()`).
8.  **Upload Playwright HTML Report Artifact (`actions/upload-artifact@v4`):** Uploads the standard `playwright-report/` directory (containing the default Playwright HTML report) as a workflow artifact named `playwright-report`. This is also kept for 5 days and uploaded even on failure (`if: always()`).