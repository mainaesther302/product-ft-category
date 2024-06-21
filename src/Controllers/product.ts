import { Request, Response, RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import { sqlConfig } from '../config';
import mssql from 'mssql';
import { ProductRequest, Product } from '../Models';

// *******************************ADD PRODUCT****************************

export const AddProduct: RequestHandler = async (req: ProductRequest, res: Response) => {
  try {
    const Id = uuid();
    const { Name, CategoryId, Price } = req.body;
    const pool = await mssql.connect(sqlConfig);

    await pool.request()
      .input('Id', mssql.VarChar, Id)
      .input('Name', mssql.VarChar, Name)
      .input('CategoryId', mssql.VarChar, CategoryId)
      .input('Price', mssql.VarChar, Price)
      .execute('addProduct');

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
// *******************************GET ALL PRODUCTS****************************

export const GetProducts: RequestHandler = async (req: ProductRequest, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().execute('getProducts');
    const products = result.recordset as Product[];
    res.status(200).json(products);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// *******************************GET PRODUCT ****************************
export const GetProduct: RequestHandler = async (req: Request<{Id:String}>, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const Product = await pool.request()
    .input('Id',req.params.Id),
    .execute('getProduct').recordset[0] as Product
    return res.status(200).json(Product);
  }
  catch (error:any) {
    return res.status(500).json({ error});
  }


// ********************UPDATE PRODUCT**********************************
export const UpdateProduct: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, price } = req.body;
    const pool = await mssql.connect(sqlConfig);

    const result = await pool.request()
      .input('Id', mssql.VarChar, id)
      .execute('getProductById');

    const product = result.recordset[0] as Product;

    if (product) {
      await pool.request()
        .input('id', mssql.VarChar, id)
        .input('name', mssql.VarChar, name)
        .input('category', mssql.VarChar, category)
        .input('price', mssql.VarChar, price)
        .execute('updateProduct');

      res.status(200).json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
