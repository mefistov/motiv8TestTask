import { PutRequestResponceBodyObject } from "../models/PutRequest-ResponceBodyObject";

export class PutBodyTestDataGenerator {
    id: number;
    title: string;
    body: string;
    userId: number;

    constructor(id: number, userId: number, title: string, body: string) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.body = body;
    }

    static defaultPutRequestBody(options: Partial<PutRequestResponceBodyObject> = {}): PutRequestResponceBodyObject {
        const defaultPutBody: PutRequestResponceBodyObject = {
            id: 1,
            title: 'test default title',
            body: 'test default body',
            userId: 1,
        };

        return { ...defaultPutBody, ...options };
    }

    static generatePutResponceBody(): PutRequestResponceBodyObject {
        return {
            id: Math.floor(Math.random() * 1000),
            title: 'Test title date:' + new Date().toLocaleString("en-GB"),
            body: 'Test body date:' + new Date().toLocaleString("en-GB"),
            userId: Math.floor(Math.random() * 1000),
        }
    
    }
}