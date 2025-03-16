import express from 'express';
import rootRoutes from "./src/routes/rootRoutes.js";
import cors from 'cors';


const app = express();


app.use(cors());

app.use(express.static("."));

app.use(express.json());


app.use(rootRoutes);


const port = 3000;

app.listen((3000), () => {
    console.log(`Server is running on port: ${port}`);
})
