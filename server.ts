import express from 'express';
import authUser from './src/Routes/ProductRouter';
import { join } from 'path/posix';


const app = express();
app.use(Json())

app.use("/auth", authUser) 

app.listen(3000, () => {
    console.log('server is running ')
})