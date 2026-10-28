import express from 'express';
import router from './route/BookRouter.js';
import { connectdb } from './config/db.js';

const app = express();

app.use(express.json());
connectdb();
app.use('/api/books',router);

const PORT = 8000;

app.listen(PORT, () => {
    console.log("Server started");
});