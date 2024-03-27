import { Router } from 'express'
import { getAllProducts } from '../controllers/productController.js'

export const router = Router()

router.get('/', getAllProducts)
