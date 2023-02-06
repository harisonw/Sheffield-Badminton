require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const AuthRouter = require('./routes/auth');

app.use('/auth', AuthRouter);

const db = process.env.MONGO_URI || 'mongodb://localhost:27017/Sheffield-Badminton';
mongoose.set('strictQuery', false); // the `strictQuery` option will be switched back to `false` by default in Mongoose 7
mongoose.connect(db);



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});