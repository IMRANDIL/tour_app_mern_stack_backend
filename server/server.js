require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')



const app = express();

//middlewares...

app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(morgan('dev'))







//routes middleware...

app.use('/users', require('./routes/user'))







const PORT = process.env.PORT || 3000;



//database connection...

mongoose.connect(process.env.URI).then(() => {
    console.log(`DB connected😃`);
    app.listen(PORT, () => {
        console.log(`Server runs on port: ${PORT}`);
    })
}).catch((error) => {
    console.log(error);
    process.exit(1)
})


