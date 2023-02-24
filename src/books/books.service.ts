import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import Book from "./ibook";
import { v4 as uuidv4 } from 'uuid';
import IBook from './ibook'
import { BooksRepository } from "./books.repository";

@Injectable()
export class BooksService {

    constructor(private bookRepo: BooksRepository) { }

    async getBook(isbn: number) {
        return await this.bookRepo.getBook(isbn);
    }

    async getAllBook() {
        return await this.bookRepo.getAllBook();
    }

    async deleteBook(isbn: number) {
        return await this.bookRepo.deleteBook(isbn);
    }

    async createBook(book: IBook) {
        return await this.bookRepo.createBook(book);
    }

    async getAuthorBooks(lastName: string, firstName: string) {
        return await this.bookRepo.getBooksByAuthor(lastName, firstName);
    }
}

// @Injectable()
// export class BooksService {
//     private tableName: string;
//     private db: DocumentClient;

//     private bookPrefix = 'BOOK#';
//     private authorPrefix = 'AUTH#'


//     constructor() {
//         this.tableName = 'online-library';
//         this.db = new AWS.DynamoDB.DocumentClient();
//     }

//     async getBooks(): Promise<any> {
//         try {
//             return this.db
//                 .scan({
//                     TableName: this.tableName,
//                 })
//                 .promise();
//         } catch (e) {
//             throw new InternalServerErrorException(e);
//         }
//     }

//     async createBook(book: Book): Promise<any> {
//         const blogObj = {
//             id: uuidv4(),
//             ...book,
//         };
//         try {
//             return await this.db
//                 .put({
//                     TableName: this.tableName,
//                     Item: blogObj,
//                 })
//                 .promise();
//         } catch (e) {
//             throw new InternalServerErrorException(e);
//         }
//     }

//     async getBook(id: string): Promise<any> {
//         try {
//             return await this.db
//                 .get({
//                     TableName: this.tableName,
//                     Key: { PK: id },
//                 })
//                 .promise();
//         } catch (e) {
//             throw new InternalServerErrorException(e);
//         }
//     }

//     async deleteBook(id: string): Promise<any> {
//         let book = {};
//         console.log("Working?");
//         try {
//             const response = await this.db
//                 .delete({
//                     TableName: this.tableName,
//                     Key: {
//                         id
//                     },
//                     ReturnValues: 'ALL_OLD',
//                 })
//                 .promise();
//             book = response.Attributes;
//         } catch (e) {
//             throw new InternalServerErrorException(e);
//         }
//         if (!book) {
//             throw new Error('Cannot delete item that does not exist')
//         }
//     }
// }

