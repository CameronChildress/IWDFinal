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

// let personSchema = mongoose.Schema({
//     name: String,
//     age: String,
//     species: String
// });

// let Person = mongoose.model('People_Collection', personSchema);