import { user } from './User';

export class News{
    id: number;
    title: string;
    catalogId: number;
    description?: string;
    author: user;
    createAt: Date;
    updateAt: Date;
    content?: string; 
}