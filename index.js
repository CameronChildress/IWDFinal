const express = require("express");
const pug = require("pug");
const cookieParser = require("cookie-parser");
const expressSession = require('express-session');
const routes = require("./routes/routes");
const path = require("path");

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(expressSession({
    secret: 'ඞ',
    saveUninitialized: true,
    resave: true
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let urlencodedparser = express.urlencoded({
    extended: false
});

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) 
    {
        next();
    } 
    else
    {
        res.redirect('/');
    }
};

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/create',  routes.create);
app.post('/createAccount', urlencodedparser, routes.createAccount);
app.post('/login', urlencodedparser, routes.loginAction);
app.get('/logOut', routes.logOut);

app.get('/accountDetails', checkAuth, routes.details);
app.get('/edit', checkAuth, routes.edit);
app.post('/editAccount', urlencodedparser, routes.editAccount);


app.listen(3000);