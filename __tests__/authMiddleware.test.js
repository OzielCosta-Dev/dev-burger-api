import jwt from 'jsonwebtoken';
import authMiddleware from '../src/app/middlewares/auth.js';  // ajuste o caminho/nome real do seu arquivo
import authConfig from '../src/config/auth.js';
import { expect, jest } from '@jest/globals';


describe('authMiddleware', () => {
  
  // aqui vão os testes

it('deve retornar 401 quando não há token', () => {
  // 1. Prepara (request, response, next simulados)
       const request = {
         headers: {}
       }

       const response = {
         status: jest.fn().mockReturnThis(),
         json: jest.fn()
       }
       
       const next = jest.fn()

  // 2. Executa (chama o middleware)
authMiddleware(request, response, next)
  // 3. Verifica (expect...)
  expect(response.status).toHaveBeenCalledWith(401)
  expect(response.json).toHaveBeenCalledWith({ error: 'Token is missing.' })
  expect(next).not.toHaveBeenCalled()
});

it('deve retornar 401 quando o token é inválido', () => {
  // 1. PREPARA
   const tokenForjado = jwt.sign({ id: 1 }, "mzg8FsZ0AxdE9pULKciTIBTQEWF0WnHl3hfi5NAJ12")

   const request = {
    headers: {
      authorization: `Bearer ${tokenForjado}`
    }
   }

   const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
   }

   const next = jest.fn()
  
  // 2. EXECUTA
  authMiddleware(request, response, next)
  // 3. VERIFICA
  expect(response.status).toHaveBeenCalledWith(401)
  expect(response.json).toHaveBeenCalledWith({ error: 'Invalid token.' })
  expect(next).not.toHaveBeenCalled()
})

it('deve chamar next() quando o tokené válido', () => {

  const tokenValid = jwt.sign({ id: 1, name: 'Teste', admin: false },
    authConfig.secret
  )

  const request = {
    headers: {
      authorization: `Bearer ${tokenValid}`
    }
  }

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }

  const next = jest.fn()

  authMiddleware(request, response, next)

  expect(next).toHaveBeenCalled()
  expect(response.status).not.toHaveBeenCalled()

  expect(request.userId).toBe(1)
  expect(request.userName).toBe('Teste')
  expect(request.userIsAdmin).toBe(false)
})

it('deve retornar 401 quando o header está mal formatado', () => {
  // 1. PREPARA
   const tokenForjado = jwt.sign({ id: 1 }, "mzg8FsZ0AxdE9pULKciTIBTQEWF0WnHl3hfi5NAJ12")

   const request = {
    headers: {
      authorization: ` ${tokenForjado}`
    }
   }

   const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
   }

   const next = jest.fn()
  
  // 2. EXECUTA
  authMiddleware(request, response, next)
  // 3. VERIFICA
  expect(response.status).toHaveBeenCalledWith(401)
  expect(response.json).toHaveBeenCalledWith({ error: 'Invalid token.' })
  expect(next).not.toHaveBeenCalled()
})


});