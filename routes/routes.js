const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://tropicalChester:chesterTheChad@iwdcluster.xe9tb.mongodb.net/accountDatabase?retryWrites=true&w=majority', {
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
    res.render('index', {
        title: "title"
    });
}

exports.edit = (req, res) => {
    User.find({ username: `${req.session.user.username}`}, (err, docs) => {
        console.log("Editing yser");
        res.render('edit', {
            title: (1==1 ? "logged in" : "logged out" ),
            user : docs[0]
        });
    });

}

exports.editAccount = (req, res) => {
    res.redirect('/');
}

exports.details = (req, res) => {
    res.render('accountDetails', {
        title: (1==1 ? "logged in" : "logged out" )
    });
}

exports.login = (req, res) => {
    if (req.session.user) {
        User.find({ username: `${req.session.user.username}`}, (err, docs) => {
            res.render('accountDetails', {
                user: docs[0]
            });
        });
    } else {
        res.render('login', {
            title: "log"
        });
    }
}


exports.loginAction = ((req, res) =>{
    console.log(req.body.username);
    console.log(req.body.password);
    User.find({ username: `${req.body.username}`}, (err, docs) => {
        console.log("Found user");
        if (bcrypt.compareSync(req.body.password, docs[0].password)) {
            req.session.user = {
                isAuthenticated:true,
                username: req.body.username
            }

            res.render('accountDetails', {
                title: 'Create Account!',
                user: docs[0]
            });
        } else {
            res.redirect("/");
        }
    });
});

//Pass in username and password and return true or false if valid
userLogin = (name, password) => {
    
}

exports.create = (req, res) => {
    res.render('createAccount', {
        title: 'Create Account!'
    });
};

exports.createAccount = (req, res) => {
    let newPass = bcrypt.hashSync(req.body.password, salt);

    let user = new User({
        username: req.body.username,
        password: newPass,
        email: req.body.email,
        age: req.body.age,
        question1Answer: req.body.questionOneAnswer,
        question2Answer: req.body.questionTwoAnswer,
        question3Answer: req.body.questionThreeAnswer
    });

    user.save((err, user) => {
        if(err) return console.error(err);
        console.log(req.body.username + ' added.');
    });

    req.session.user = {
        isAuthenticated:true,
        username: req.body.username
    }

    //CHANGE TO HOME PAGE IF NEEDED
    res.render('accountDetails', {
        title: `Logged in as ${user.username}`,
        user
    });
};

exports.logOut = (req, res) => {
    req.session.user = null;

    res.redirect('/');
}

exports.editAccount = (req, res) => {
    let newPass = bcrypt.hashSync(req.body.password, salt);
    User.find({ username: `${req.session.user.username}`}, (err, docs) => {
        console.log("Editing User");
        console.log(req.session.user.username);
        docs[0].username = req.body.username;
        docs[0].password = newPass;
        docs[0].email = req.body.email;
        docs[0].age = req.body.age;
        docs[0].question1Answer = req.body.questionOneAnswer;
        docs[0].question2Answer = req.body.questionTwoAnswer;
        docs[0].question3Answer = req.body.questionThreeAnswer;
        
        docs[0].save((err, user) => {
            if(err) return console.error(err);
            console.log(docs[0].username + ' updated.');
        
            res.render("accountDetails", {
                title: `Logged in as ${user.username}`,
                user: docs[0]
            })
        });
    });

}