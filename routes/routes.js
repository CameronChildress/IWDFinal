const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://tropicalChester:chesterTheChad@iwdcluster.xe9tb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: String,
    question1Answer: String,
    question2Answer: String,
    question3Answer: String
});

let User = mongoose.model('User_Collection', userSchema);

exports.index = (req, res) => {
    res.render('create', {
        title: (1==1 ? "logged in" : "logged out" )
    })
}

exports.details = (req, res) => {
    res.render('accountDetails', {
        title: (1==1 ? "logged in" : "logged out" )
    })
}

exports.create = (req, res) => {
    res.render('createAccount', {
        title: 'Add User'
    });
};

exports.createUser = (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        question1Answer: req.body.question1Answer,
        question2Answer: req.body.question2Answer,
        question3Answer: req.body.question3Answer
    });

    user.save((err, user) => {
        if(err) return console.error(err);
        console.log(req.body.username + ' added.');
    });

    //CHANGE TO HOME PAGE IF NEEDED
    res.redirect('/');
};