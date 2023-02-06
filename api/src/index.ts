import express from "express";
import cors from 'cors';
const app = express();
import routes from "./routes/index";
const PORT = 3001;


const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
}

app.use(cors(options))
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})