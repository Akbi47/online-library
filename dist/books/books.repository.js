"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRepository = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const AWS = require("aws-sdk");
let BooksRepository = class BooksRepository {
    constructor() {
        this.bookPrefix = 'BOOK#';
        this.authorPrefix = 'AUTH#';
        this.tableName = 'online-library';
        this.db = new AWS.DynamoDB.DocumentClient();
    }
    getBook(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            let book;
            try {
                const result = yield this.db
                    .get({
                    TableName: this.tableName,
                    Key: {
                        PK: String(isbn),
                    },
                })
                    .promise();
                book = result.Item;
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(error);
            }
            if (!book) {
                throw new common_1.NotFoundException(`Book with ISBN "${isbn}" not found`);
            }
            return book;
        });
    }
    getAllBook() {
        return __awaiter(this, void 0, void 0, function* () {
            let book;
            try {
                return yield this.db
                    .scan({
                    TableName: this.tableName,
                })
                    .promise();
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(error);
            }
        });
    }
    deleteBook(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            let book = {};
            try {
                const result = yield this.db
                    .delete({
                    TableName: this.tableName,
                    Key: {
                        PK: String(isbn),
                    },
                    ReturnValues: 'ALL_OLD',
                })
                    .promise();
                book = result.Attributes;
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(error);
            }
            return book;
        });
    }
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookObj = Object.assign({ PK: (0, uuid_1.v4)() }, book);
            try {
                return yield this.db
                    .put({
                    TableName: this.tableName,
                    Item: bookObj,
                })
                    .promise();
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(error);
            }
        });
    }
    getBooksByAuthor(lastName, firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            let books = [];
            try {
                const result = yield this.db
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
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(error);
            }
            return books;
        });
    }
};
BooksRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BooksRepository);
exports.BooksRepository = BooksRepository;
//# sourceMappingURL=books.repository.js.map