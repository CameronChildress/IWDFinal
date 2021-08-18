const express = require("express");
const pug = require("pug");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");
const path = require("path");

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let urlencodedparser = express.urlencoded({
    extended: false
});

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/create', routes.create);
app.post('/createAccount', urlencodedparser, routes.createAccount);
app.get('/accountDetails', routes.details);


app.listen(3000);