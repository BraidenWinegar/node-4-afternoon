require("dotenv").config();
const express = require("express")
const session = require("express-session")
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController');
const authController = require('./controllers/authController');
const cartController = require('./controllers/cartController');
const searchController = require('./controllers/searchController')

let {SERVER_PORT, SESSION_SECRET} = process.env

app = express();

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

/////searchController
app.get('/api/search', searchController.search)

////cartController
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

////authController
app.post('/api/register', authController.register);
app.post('/api/login', authController.login)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)

//swag  
app.get('/api/swag', swagController.read);

const port = SERVER_PORT
app.listen(port ,() => console.log(`server on ${port}`) )