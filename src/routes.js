import { Router } from 'express';
import CategoryController from './app/controllers/CategoryController.js';
import ProductController from './app/controllers/ProductController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/userController.js';
import multerConfig from './config/multer.cjs';
import multer from 'multer';
import authMiddleware from './middlewares/auth.js';
import adminMiddleware from './middlewares/admin.js';
import OrderController from './app/controllers/OrderController.js';

const routes = new Router();

// Métodos HTTP:
/* 
   POST -> Criar um registro
   GET -> Listar registros

   PUT -> Atualizar um registro
   DELETE -> Deletar um registro
*/

const upload = multer(multerConfig)

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware)

routes.post('/products', adminMiddleware,upload.single('file'), ProductController.store);
routes.put('/products/:id', adminMiddleware,upload.single('file'), ProductController.update);
routes.get('/products', ProductController.index) 

routes.post('/categories', adminMiddleware, upload.single('file'), CategoryController.store);
routes.put('/categories/:id', adminMiddleware, upload.single('file'), CategoryController.update);
routes.get('/categories', CategoryController.index) 

routes.post('/orders', adminMiddleware, OrderController.store) ;






export default routes;
