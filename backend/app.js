const express = require('express');
const mongoose = require('mongoose');
const connectDatabase = require('./common/database');
const Routes = require('./authorization/routes');

const app = express();

connectDatabase();

app.use(express.json());

app.use('/', Routes);

const PORT =process.env.PORT || 3000;
app.listen(PORT, ()=> console.log((`Sever running on port ${PORT}`)));