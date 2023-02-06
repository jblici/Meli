// Importamos los módulos requeridos
import express from "express";
import cors from "cors";

// Creamos la instancia de express
const app = express();

// Importamos las rutas
import routes from "./routes/index";

// Seteamos el puerto donde el servidor va a estar escuchando
const PORT = 3001;

// Definimos las url permitidos para el middleware de CORS
const allowedOrigins = ["http://localhost:3000"];

// Seteamos las opciones del middleware CORS
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Agregamos el middleware CORS para la app
app.use(cors(options));

app.use(express.json());

// Montamos la ruta /api para el endpoint
app.use("/api", routes);

// Seteamos el server para que escuche en el puerto definido como 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
