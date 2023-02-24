import { DocumentClient } from "aws-sdk/clients/dynamodb";
import IBook from './ibook';
import * as AWS from 'aws-sdk';
export declare class BooksRepository {
    private tableName;
    private db;
    private bookPrefix;
    private authorPrefix;
    constructor();
    getBook(isbn: number): Promise<object>;
    getAllBook(): Promise<import("aws-sdk/lib/request").PromiseResult<DocumentClient.ScanOutput, AWS.AWSError>>;
    deleteBook(isbn: number): Promise<{}>;
    createBook(book: IBook): Promise<import("aws-sdk/lib/request").PromiseResult<DocumentClient.PutItemOutput, AWS.AWSError>>;
    getBooksByAuthor(lastName: string, firstName: string): Promise<any[]>;
}
