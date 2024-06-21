import {Request } from 'express'
export interface Product{
    Id: string,
    Name: string,
    CategoryId: string,
    Price: number,
    
}
interface AddProduct{
    Name: string,
    CategoryId: string,
    Price: number,
    
}
export interface ProductRequest extends Request{
    body: AddProduct
}