import * as Yup from 'yup'
import Product from '../models/Product.js'
import Category from '../models/Category.js'




class ProductController {
    async store(request, response) {
        
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
        })

        try {
          schema.validateSync(request.body, { abortEarly: false })
        }catch(err){
         return response.status(400).json({error: err.errors})
        }
        
        if (!request.file) {
            return response.status(400).json({ error: 'Product image is required' })
        }
 
        const { name, price, category_id, offer } = request.body
        const { filename } = request.file
        try {
            const newProduct = await Product.create({
                name,
                price,
                category_id,
                path: filename,
                offer
            })
        
        return response.status(201).json(newProduct)
    } catch (err) {
        console.log('====================')
  console.log(err.name)
  console.log(err.message)

  if (err.parent) {
    console.log(err.parent.message)
    console.log(err.parent.detail)
  }

  return response.status(500).json({
    error: err.message
  })
}
    }

     async update(request, response) {
        
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean(),
        })

        try {
          schema.validateSync(request.body, { abortEarly: false })
        }catch(err){
         return response.status(400).json({error: err.errors})
        }
        
    /*     if (!request.file) {
            return response.status(400).json({ error: 'Product image is required' })
        } */
 
        const { name, price, category_id, offer } = request.body
        const { id } = request.params



        let path 
        if (request.file) {
        const { filename } = request.file
        path = filename
        }

        try {
        await Product.update({
                name,
                price,
                category_id,
                path,
                offer
            }, {
                where: {
                    id
                }
            })
        
        return response.status(201).json()
        
    
    } catch (err) {
        console.log('====================')
  console.log(err.name)
  console.log(err.message)

  if (err.parent) {
    console.log(err.parent.message)
    console.log(err.parent.detail)
  }

  return response.status(500).json({
    error: err.message
  })
}
    }

    async index(_request, response) {
        
        const products = await Product.findAll({
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }]
        })

        console.log(_request.userId)

        return response.status(200).json(products)


    }
}

export default new ProductController();