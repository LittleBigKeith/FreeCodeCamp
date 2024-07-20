const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {});

const book = () => {
    bookSchema = new mongoose.Schema({
        title: String,
        comments: [String],
    });

    return mongoose.model('Book', bookSchema);
}

exports.model = book();