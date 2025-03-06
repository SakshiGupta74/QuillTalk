import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from'dotenv';
import connect from './models/db.js'
import AuthRouter from './routes/AuthRouter.js'
import ProductRouter from './routes/ProductRoutes.js'
import AdminRoutes from './routes/Adminroutes.js';
import blogRoutes from './routes/blogRoutes.js';
import path from 'path';
dotenv.config({ path: './.env' });
const app = express();


let PORT = process.env.PORT || 4000;

const _dirname = path.resolve();

app.get('/ping',(req,res)=>{
    res.send("PONG")
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter )
app.use('/products',ProductRouter )
app.use('/admin',AdminRoutes)
app.use('/blog',blogRoutes)

app.use(express.static(path.join(_dirname,"/frontend/build")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","build","index.html"))
})

app.listen(PORT,async function () {
    try{
        await connect();
        console.log(`server is running on ${PORT}`);
    } catch (error) {
        console.log(error);
    }
    });