export const getAllProducts = (req, res) => {
	console.log('GET /produtos')
	res.status(200).json({ message: 'GET /produtos' })
}
