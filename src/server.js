import express from 'express'
import { router as productRouter } from './routes/product.js'

const app = express()

app.use(express.json())
app.use('/produtos', productRouter)

const PORT = 3333
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
