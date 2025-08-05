import express from "express"
import { connectMongoDB } from "./connection.js"
import { router } from "./routes/url.js"
import { handleRedirection } from "./controllers/url.js"
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express()
const port = process.env.PORT || 8000

connectMongoDB(process.env.MONGO_URL)
  .then(() => { console.log("connected to mongoDB")})

app.use(express.json())
app.use(cors({
  origin: "https://short-vader.vercel.app"
}));

app.get('/', (req, res) => {
  res.send('<h2>welcome to the server !</h2>')
})

app.use('/', router)

//dynamic route for redirection

app.get('/:shortID', handleRedirection)


app.listen(port, () => {
  console.log(`running app on port ${port}`)
})
