const express = require('express');
const cors = require('cors');
const connectDatabase = require('./common/database');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());


connectDatabase()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database connection failed", err));

const User = require('./common/models/User')
const Routes = require('./authorization/routes');
app.use('/', Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log((`Server running on port ${PORT}`)));