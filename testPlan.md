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