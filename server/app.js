require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const fileUpload = require('express-fileupload');

const app = express();
connectDB();

if (process.env.NODE_ENV === 'development') {
  	app.use(morgan('dev'))
}

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
	useTempFiles:true
}))
app.use('/v1/api/auth',require('./routes/auth'));
app.use('/v1/api/product',require('./routes/product'));
app.use('/v1/api/images',require('./routes/upload'));
app.use('/v1/api/user',require('./routes/user'));
app.use('/v1/api/order',require('./routes/order'));

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
	console.log(`Server listening to port ${PORT}`)
})