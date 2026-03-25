const express = require('express');
const cors = require('cors');
const connectDatabase = require('./common/database');
const Routes = require('./authorization/routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', Routes);

connectDatabase();


const PORT = 3000;


app.listen(PORT, ()=> console.log((`Server running on port ${PORT}`)));