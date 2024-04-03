import { Router } from 'express'
import {
	getAllProducts,
	getProductById,
	addProduct,
	editProduct
} from '../controllers/productController.js'

export const router = Router()

router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', addProduct)
router.put("/:id", editProduct)