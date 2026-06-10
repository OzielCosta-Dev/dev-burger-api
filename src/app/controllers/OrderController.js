import * as Yup from 'Yup'
import Product from '../models/Product.js'




class OrderController {
    async store(request, response) {
        
        const schema = Yup.object({
           products: Yup.array().required()
           .of(
            Yup.object({
                id: Yup.number().required(),
                quantity: Yup.number().required()
            })
           )
        })

        try {
          schema.validateSync(request.body, { abortEarly: false, strict: true })
        }catch(err){
         return response.status(400).json({error: err.errors})
        }
        
     /*    if (!request.file) {
            return response.status(400).json({ error: 'Product image is required' })
        }  */
        


        const { userId, userName } = request
        const { products } = request.body


        const productIds = products.map(product => product.id)


        const findedProducts = await Product.findAll({
            where: {
                id: productIds
            }
        })

        const order = {
            user: {
                id: userId,
                name: userName,
            },
            products: findedProducts ,
        }
    
        return response.status(201).json(order)

        }
    }

  


export default new OrderController();