import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js';
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'url';


const app = express();
app.use(bodyParser.json());
app.use(cors())
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

const PORT = process.env.PORT || 8000;
// const MONGO_COMPAS_LOCAL = process.env.MONGO_COMPAS_LOCAL
const MONGO_COMPAS_MONGODB_URL = process.env.MONGO_COMPAS_MONGODB_URL
const MONGODB_URL_BASE = process.env.MONGODB_URL_BASE

const MONGODB_URL = isProduction
  ? MONGODB_URL_BASE
  : MONGO_COMPAS_MONGODB_URL
console.log(process.env.NODE_ENV, 22222222)
mongoose
  // .connect(MONGODB_URL, {
  //   dbName: 'list'
  // })
  .connect(MONGODB_URL)
  .then(() => {
    console.log('MongoDB is connected...')
    app.listen(PORT, () => {
      console.log(`Server is starting on ${PORT}`)
    })
  })
  .catch((err) => console.log(err))

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

// app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use("/api", userRoute)

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

// app.get('/test', (req, res) => res.send('Test Request'))

app.use("/", (req, res) => {

  return res.status(200).send(`SERVER is running...3333333Ok!!! ${process.env.PORT} - port
    and mongo_url - ${process.env.MONGODB_URL} |||  ${process.env.NODE_ENV} - ENV`)

})

// app.listen(5000, (req, res) => {
//   console.log('Server is started on Port 5000...')
// })
