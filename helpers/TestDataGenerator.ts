import { PostRequestBodyObjectModel } from "../models/PostRequestBodyObjectModel";

export class TestDataGenerator {
    userId: number;
    title: string;
    body: string;

    constructor(userId: number, title: string, body: string) {
        this.userId = userId;
        this.title = title;
        this.body = body;
    }

    static defaultPostRequestBody(options: Partial<PostRequestBodyObjectModel> = {}): PostRequestBodyObjectModel {
        const defaultPostBody: PostRequestBodyObjectModel = {
            userId: 1,
            title: 'test default title',
            body: 'test default body',
        };

        return { ...defaultPostBody, ...options };
    }

    static generatePostResponceBody(): PostRequestBodyObjectModel {
        return {
            userId: Math.floor(Math.random() * 1000),
            title: 'Test title date:' + new Date().toLocaleString("en-GB"),
            body: 'Test body date:' + new Date().toLocaleString("en-GB"),
        }
    
    }
}