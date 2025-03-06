import express from 'express'
import { Getuser } from '../controllers/AdminController.js';


const AdminRoutes = express.Router()
AdminRoutes.get('/getuser',Getuser);


export default AdminRoutes;