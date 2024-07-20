const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {});

const issue = () => {
    issueSchema = new mongoose.Schema({
        issue_title: String,
        issue_text: String,
        created_by: String,
        assigned_to: String,
        status_text: String,
        created_on: Date,
        updated_on: Date,
        open: Boolean,
        project: String,
    });

    return mongoose.model('Issue', issueSchema);
}

exports.model = issue();