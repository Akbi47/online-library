import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import IBook from './ibook';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';

@Injectable()
export class BooksRepository {

    private tableName: string;
    private db: DocumentClient;

    private bookPrefix = 'BOOK#';
    private authorPrefix = 'AUTH#'


    constructor() {
        this.tableName = 'online-library';
        this.db = new AWS.DynamoDB.DocumentClient();
    }


    async getBook(isbn: number) {
        let book: object;

        try {
            const result = await this.db
                .get({
                    TableName: this.tableName,
                    Key: {
                        PK: String(isbn),
                        //    SK: this.bookPrefix.concat(String(isbn))
                    },
                })
                .promise();

            book = result.Item;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!book) {
            throw new NotFoundException(`Book with ISBN "${isbn}" not found`);
        }

        return book;
    }

    async getAllBook() {
        let book: object;

        try {
            return await this.db
                .scan({
                    TableName: this.tableName,
                })
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteBook(isbn: number) {
        let book = {};

        try {
            const result = await this.db
                .delete({
                    TableName: this.tableName,
                    Key: {
                        PK: String(isbn),
                    },
                    ReturnValues: 'ALL_OLD',
                })
                .promise();

            book = result.Attributes;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return book;
    }

    async createBook(book: IBook) {
        const bookObj = {
            PK: uuidv4(),
            ...book,
        };

        try {
            return await this.db
                .put({
                    TableName: this.tableName,
                    Item: bookObj,
                })
                .promise();

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }



    async getBooksByAuthor(lastName: string, firstName: string) {
        let books = [];

        try {
            const result = await this.db
                .query({
                    TableName: this.tableName,
                    KeyConditionExpression: '#PK=:PK AND begins_with(#SK, :SK)',
                    ExpressionAttributeNames: {
                        '#PK': 'PK',
                        '#SK': 'SK'
                    },
                    ExpressionAttributeValues: {
                        ':PK': this.authorPrefix.concat(lastName.toUpperCase()).concat("_").concat(firstName.toUpperCase()),
                        ':SK': this.bookPrefix
                    },
                    ScanIndexForward: false,
                    Limit: 100
                })
                .promise();
            books = result.Items;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return books;
    }
}
