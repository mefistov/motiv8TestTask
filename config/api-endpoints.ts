export enum APIEndpoints {

    GET_POSTS = '/posts',
    GET_POST_BY_ID = '/posts/{id}',
    GET_POST_BY_ID_COMMENTS = '/posts/{id}/comments',
    GET_COMMENTS_BY_POST_ID = '/comments/?postId={id}',
    POST_COMMENTS = '/posts',
    PUT_COMMENTS = '/posts/{id}',
    PATCH_COMMENTS = '/posts/{id}',
    DELETE_COMMENT_BY_ID = '/posts/{id}',
} 