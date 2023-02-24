import { BooksService } from "./books.service";
export declare class BooksController {
    private bookService;
    constructor(bookService: BooksService);
    getBookByISBN(isbn: number, res: any): Promise<any>;
    getAllBook(res: any): Promise<any>;
    deleteBookByISBN(isbn: number, res: any): Promise<any>;
    createBook(body: any, res: any): Promise<any>;
    getBooksByAuthor(lastName: string, firstName: string, res: any): Promise<any>;
}
