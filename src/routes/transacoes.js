import { Router } from 'express'
import {
	getTransacoes,
	createTransacao,
	updateTransacao,
	deleteTransacao,
	getTransacaoByID
} from '../controllers/transacoes.js'

const router = Router()

router.get('/', getTransacoes)
router.get("/:id", getTransacaoByID)
router.post('/', createTransacao)
router.put('/:id', updateTransacao)
router.delete('/:id', deleteTransacao)

export default router
