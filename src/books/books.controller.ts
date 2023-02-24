import { Controller, Get, Delete, HttpStatus, Param, Res, Post, Body } from '@nestjs/common';
// import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { BooksService } from "./books.service";
import Book from "./ibook";

@Controller('books')
export class BooksController {

    constructor(private bookService: BooksService) { }

    @Get("/:isbn")
    async getBookByISBN(@Param('isbn') isbn: number, @Res() res: any) {
        const book: object = await this.bookService.getBook(isbn);
        return res.status(HttpStatus.OK).json(book);
    }

    @Get()
    async getAllBook(@Res() res: any) {
        const book: object = await this.bookService.getAllBook();
        return res.status(HttpStatus.OK).json(book);
    }

    @Delete("/:isbn")
    async deleteBookByISBN(@Param('isbn') isbn: number, @Res() res: any) {
        const book: object = await this.bookService.deleteBook(isbn);
        return res.status(HttpStatus.OK).json(book);
    }

    @Post()
    async createBook(@Body() body: any, @Res() res: any) {
        const book: object = await this.bookService.createBook(body);
        return res.status(HttpStatus.OK).json(book);
    }

    @Get("/author/:lastName/:firstName")
    async getBooksByAuthor(@Param('lastName') lastName: string, @Param('firstName') firstName: string, @Res() res: any) {
        const books: any[] = await this.bookService.getAuthorBooks(lastName, firstName);
        return res.status(HttpStatus.OK).json(books);
    }
}
// @Controller('books')
// export class BooksController {
//     constructor(private readonly bookService: BooksService) { }

//     @Get()
//     async getTodos(): Promise<Book[]> {
//         return await this.bookService.getBooks();
//     }

//     @Post()
//     async createTodo(@Body() book: Book): Promise<Book> {
//         return await this.bookService.createBook(book);
//     }

//     @Get(':id')
//     async getTodo(@Param() id: string): Promise<Book> {
//         return await this.bookService.getBook(id);
//     }

//     @Delete(':id')
//     async deleteTodo(@Param() id: string): Promise<any> {
//         return await this.bookService.deleteBook(id);
//     }
// }