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

// const MONGO_URL_RES = "mongodb://localhost:27017/mern-stack"
const PORT = process.env.PORT || 8000;
// const MONGO_URL = process.env.MONGO_URL || MONGO_URL_RES
const MONGODB_URL = process.env.MONGODB_URL

mongoose
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
// app.use("/api", userRoute)

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

// app.get('/test', (req, res) => res.send('Test Request'))

app.use("/", (req, res) => {

  return res.send(`SERVER is running...3333333Ok!!! ${process.env.PORT} - port
    and mongo_url - ${process.env.MONGODB_URL}`)

})

// app.listen(5000, (req, res) => {
//   console.log('Server is started on Port 5000...')
// })
