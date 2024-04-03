import { pool } from '../config/configDB.js'

export default class Product {
	constructor(descr, categoria, preco, qtd) {
		this.descr = descr
		this.categoria = categoria
		this.preco = preco
		this.qtd = qtd
	}

	async queryDatabase(query, params = []) {
		try {
			const [result] = await pool.execute(query, params)
			return result
		} catch (error) {
			throw error
		}
	}

	static async selectAll() {
		const query = 'SELECT * FROM produtos'
		return await this.queryDatabase(query)
	}

	static async selectById(id) {
		const query = 'SELECT * FROM produtos WHERE id = ?'
		return await this.queryDatabase(query, [id])
	}

	async create() {
		const query =
			'INSERT INTO produtos(descr, categoria, preco, qtd) VALUES (?, ?, ?, ?)'
		return await this.queryDatabase(query, [
			this.descr,
			this.categoria,
			this.preco,
			this.qtd,
		])
	}

	async update(id) {
		const query =
			'UPDATE produtos SET descr = ?, categoria = ?, preco = ?, qtd = ? WHERE id = ?'
		return await this.queryDatabase(query, [
			this.descr,
			this.categoria,
			this.preco,
			this.qtd,
			id,
		])
	}
}
