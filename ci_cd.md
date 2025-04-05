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