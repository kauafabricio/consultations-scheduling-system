// IMPORTS
import express from "express"
import mongoose from "mongoose"
import env from "./env.js"
import cors from "cors"
import router from "./routes/routes.js"

const app = express()

// Configuration

app.use(express.static('../public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(router)

// MongoDB connection

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const uri = `mongodb+srv://${env.DB_USER}:${env.DB_PASS}@mycluster.pyhihoy.mongodb.net/?retryWrites=true&w=majority&appName=myCluster`

mongoose.connect(uri, clientOptions)
.then(() => console.log('Conexão com o MongoDB estabelecida!'))
.catch((error) => console.log(error.message))

// Application


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
