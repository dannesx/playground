import { db } from '../config/dbconfig.js'

export function getTransacoes(req, res) {
	const query = 'SELECT * FROM transacoes'

	db.query(query, (error, result) => {
		if (error) {
			return res.status(500).json(error)
		}

		return res.json(result)
	})
}

export function getTransacaoByID(req, res) {
	const { id } = req.params
	const query = 'SELECT * FROM transacoes WHERE id = ?'

	db.query(query, [id], (error, result) => {
		if (error) return res.status(500).json(error)

		if (result.length == 0) {
			return res
				.status(404)
				.json({ status: 'erro', message: 'Transação não encontrada' })
		}
		return res.json(result[0])
	})
}

export function createTransacao(req, res) {
	const { remetente, destinatario, formato, valor } = req.body

	console.log("Oi")

	if (!remetente || !destinatario || !valor) {
		return res
			.status(400)
			.json({
				status: 'erro',
				message:
					'Rementente, destinatário e valor são requeridos. Falha ao efetuar nova transação',
			})
	}

  if (valor < 0) {
    return res.status(400).json({status: "erro", message: "Valor inválido. Tente novamente"})
  }

	const query =
		'INSERT INTO transacoes(remetente, destinatario, formato, valor) VALUES (?, ?, ?, ?)'

	db.query(
		query,
		[remetente, destinatario, formato, valor],
		(error, result) => {
			if (error) return res.status(500).json(error)

			return res.status(201).json(result)
		}
	)
}

export function updateTransacao(req, res) {
	const { id } = req.params
	const { remetente, destinatario, formato, valor } = req.body

	const query =
		'UPDATE transacoes SET remetente = ?, destinatario = ?, formato = ?, valor = ? WHERE id = ?'

	db.query(
		query,
		[remetente, destinatario, formato, valor, id],
		(error, result) => {
			if (error) return res.status(500).json(error)

			if (result.affectedRows <= 0) {
				return res.status(404).json({
					status: 'erro',
					message: 'Transação não encontrada. Nenhuma modificação foi feita',
				})
			}

			return res.json(result)
		}
	)
}

export function deleteTransacao(req, res) {
	const { id } = req.params

	const query = 'DELETE FROM transacoes WHERE id = ?'

	db.query(query, [id], (error, result) => {
		if (error) return res.status(500).json(error)

		if (result.affectedRows == 0) {
			return res.status(404).json({
				status: 'erro',
				message: 'Transação não encontrada. Nenhuma modificação foi feita',
			})
		}

		return res.status(204).send()
	})
}
