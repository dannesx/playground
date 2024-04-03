import Product from '../models/Product.js'

export const getAllProducts = async (req, res) => {
	console.log('GET /produtos')

	const products = await Product.selectAll()

	if (!products) {
		res
			.status(500)
			.json({ message: 'Não foi possível acessar o banco de dados' })
	}

	res.status(200).json(products)
}

export const getProductById = async (req, res) => {
	const id = req.params.id
	console.log(`GET /produtos/${id}`)

	const product = await Product.selectById(id)

	if (!product.length) {
		res
			.status(404)
			.json({ message: `Não foi encontrado um produto com id ${id}` })
	} else {
		res.status(200).json(product)
	}
}

export const addProduct = async (req, res) => {
	const { descr, categoria, preco, qtd } = req.body
	const produto = new Product(descr, categoria, preco, qtd)

	console.log('POST /produtos', produto)

	const result = await produto.create()

	if (result) {
		res.status(201).json({ message: 'Produto criado com sucesso' })
	} else {
		res.status(400).json({ message: 'Falha ao criar um novo produto' })
	}
}

export const editProduct = async (req, res) => {
	const { descr, categoria, preco, qtd } = req.body
	const id = req.params.id
	const produto = new Product(descr, categoria, preco, qtd)

	const result = await produto.update(id)

	if(result) {
		res.status(200).json({message: `Produto ${id} modificado com sucesso`})
	} else {
		res.status(400).json({message: `Falha ao editar o produto ${id}`})
	}
}
