import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as AWS from 'aws-sdk';
import IBook from './ibook';
import { BooksRepository } from "./books.repository";
export declare class BooksService {
    private bookRepo;
    constructor(bookRepo: BooksRepository);
    getBook(isbn: number): Promise<object>;
    getAllBook(): Promise<import("aws-sdk/lib/request").PromiseResult<DocumentClient.ScanOutput, AWS.AWSError>>;
    deleteBook(isbn: number): Promise<{}>;
    createBook(book: IBook): Promise<import("aws-sdk/lib/request").PromiseResult<DocumentClient.PutItemOutput, AWS.AWSError>>;
    getAuthorBooks(lastName: string, firstName: string): Promise<any[]>;
}
