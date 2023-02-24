import { IAuthor } from "./iauthor";

// export interface IBook {

//     isbn: number;
//     title: string;
//     author: IAuthor;
//     reserved: boolean;
//     edition: number;
//     publisher: string

// }
export default interface Blog {
    title: string;
    coverImage: String;
    body: string;
    createdBy: string;
    dateCreated: string;
}