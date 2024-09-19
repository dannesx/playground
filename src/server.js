import express from 'express'
import router from "./routes/transacoes.js"

const app = express()

app.use(express.json())
app.use("/transacoes", router)
app.listen(3000, () => console.log('Servidor rodando'))
