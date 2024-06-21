import {Router} from 'express'
import {AddProduct,GetProducts,UpdateProduct,GetProduct} from "../Controllers/product"

const ProductRouter = Router()

ProductRouter.get("",GetProducts )
ProductRouter.get("/Id",GetProduct )
ProductRouter.post("", AddProduct)
ProductRouter.put("/Id",UpdateProduct )

export default ProductRouter;