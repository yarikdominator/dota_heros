require('dotenv').config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload');
const path = require('path');

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);
//обработка ошибок
app.use(errorHandler);

const PORT = process.env.PORT;

const start = async () =>{
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (err) {
        console.error(err.message);
    }
}

start()