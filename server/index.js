import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js';
import cors from 'cors'

const app = express();
app.use(bodyParser.json());
app.use(cors())
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production';

const PORT = process.env.PORT || 8000;
const MONGO_COMPAS_MONGODB_URL = process.env.MONGO_COMPAS_MONGODB_URL
const MONGODB_URL_BASE = process.env.MONGODB_URL_BASE

const MONGODB_URL = isProduction
  ? MONGODB_URL_BASE
  : MONGO_COMPAS_MONGODB_URL

const DB_NAME = process.env.DB_NAME
mongoose
  .connect(MONGODB_URL, {
    dbName: DB_NAME
  })
  .then(() => {
    console.log('MongoDB is connected...')
    app.listen(PORT, () => {
      console.log(`Server is starting on ${PORT}`)
    })
  })
  .catch((err) => console.log(err))

app.use("/api", userRoute)
app.use("/", (_, res) => {
  return res.status(200).send(`SERVER is running on port = ${process.env.PORT} - port
    and mongo_url = ${process.env.MONGODB_URL}`)
})
