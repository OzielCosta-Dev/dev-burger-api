import { Router } from 'express';
import ProductController from './app/controllers/ProductController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/userController.js';

const routes = new Router();

// Métodos HTTP:
/* 
   POST -> Criar um registro
   GET -> Listar registros
   PUT -> Atualizar um registro
   DELETE -> Deletar um registro
*/
routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);
routes.post('/products', ProductController.store) 
export default routes;
