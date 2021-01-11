const express = require('express');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
require('dotenv').config();

// const User = require('./db/models/userModel');

const app = express();
const userRoutes = require('./routes/userRoutes');

connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/users', userRoutes);

// const data = {
//   name: 'george',
//   email: 'contact@the-devlab.co.uk',
//   username: 'the-devlab',
//   password: 'qwerty',
//   isAdmin: false
// };

// const newUser = new User(data);

// console.log('Body: ', data);

// newUser.save(error => {
//   if (error) {
//     console.log('error');
//   } else {
//     console.log('data saved');
//   }
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
