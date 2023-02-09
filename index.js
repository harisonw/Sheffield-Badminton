require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');

const AuthRouter = require('./routes/auth');

app.use('/auth', AuthRouter);

const db = process.env.MONGO_URI || 'mongodb://localhost:27017/Sheffield-Badminton';
mongoose.set('strictQuery', false); // the `strictQuery` option will be switched back to `false` by default in Mongoose 7
mongoose.connect(db);

app.use(passport.initialize());

require('./config/passport');

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).send({
    message: 'You are authorized to view this content',
    username : req.user.username
  });
});


app.get('/', (req, res) => {
  res.send('Hello World!'); 
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});