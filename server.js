import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import DbConn from './Database/Db.js';
import CrudRoutes from './routes/routes.js'
DbConn
dotenv.config()
const app = express();
DbConn()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send('App is running')
})
app.use('/user',CrudRoutes)

const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`App is listing on port ${port}`);
})