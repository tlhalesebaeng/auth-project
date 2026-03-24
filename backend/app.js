const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

const PORT =process.env.PORT || 3000;
app.listen(PORT, ()=> console.log((`Sever running on port ${PORT}`)));