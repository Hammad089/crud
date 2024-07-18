import express from 'express';
import { CreateRequest, DeleteUser, getAllUser, getSpecificUser, UpdateUser } from '../controllers/UserController.js';


const routes = express.Router();
routes.post('/create',CreateRequest);
routes.get('/getuser',getAllUser)
routes.get('/getuser/:id',getSpecificUser)
routes.get('/Delete/:id',DeleteUser)
routes.get('/update/:id',UpdateUser)

export default routes
