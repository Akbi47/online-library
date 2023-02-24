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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("./books.service");
let BooksController = class BooksController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    getBookByISBN(isbn, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookService.getBook(isbn);
            return res.status(common_1.HttpStatus.OK).json(book);
        });
    }
    getAllBook(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookService.getAllBook();
            return res.status(common_1.HttpStatus.OK).json(book);
        });
    }
    deleteBookByISBN(isbn, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookService.deleteBook(isbn);
            return res.status(common_1.HttpStatus.OK).json(book);
        });
    }
    createBook(body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookService.createBook(body);
            return res.status(common_1.HttpStatus.OK).json(book);
        });
    }
    getBooksByAuthor(lastName, firstName, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.bookService.getAuthorBooks(lastName, firstName);
            return res.status(common_1.HttpStatus.OK).json(books);
        });
    }
};
__decorate([
    (0, common_1.Get)("/:isbn"),
    __param(0, (0, common_1.Param)('isbn')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getBookByISBN", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getAllBook", null);
__decorate([
    (0, common_1.Delete)("/:isbn"),
    __param(0, (0, common_1.Param)('isbn')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "deleteBookByISBN", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "createBook", null);
__decorate([
    (0, common_1.Get)("/author/:lastName/:firstName"),
    __param(0, (0, common_1.Param)('lastName')),
    __param(1, (0, common_1.Param)('firstName')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getBooksByAuthor", null);
BooksController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map