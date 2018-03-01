const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var commentSchema = new Schema({
    "authorName": String,
    "authorEmail": String,
    "subject": String,
    "commentText": String,
    "postedDate": Date,
    "replies": {
        "_id": String,
        "comment_id": String,
        "authorName": String,
        "authorEmail": String,
        "commentText": String,
        "repliedDate": Date
    }
});

var Comment;

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://user1:abcdefg@ds151508.mlab.com:51508/myprofile");
        db.on('error', (err)=>{
            reject(err); // reject the promise with the provided error
        });
        db.once('open', ()=>{
            Comment = db.model("comments", commentSchema);
            resolve();
        });
    });
};

module.exports.addComment = function (data) {
    return new Promise((resolve, reject) =>{
        data.postedDate=Date.now();
        let newComment = new Comment(data);
        newComment.save((err) => {
            if(err){
                reject("There was an error saving the comment: " + err);
            }else{
                resolve(newComment._id);
            }
        });
    });
}

module.exports.getAllComments = function () {
    return new Promise((resolve, reject) => {
        Comment.find({}).sort({postedDate: 1})
        .exec()
        .then((data) => {
            resolve(data);
        }).catch((err) => {
            reject("caught " + err);
        });
    });
}

module.exports.addReply = function(data) {
    return new Promise((resolve, reject) => {
        data.repliedDate=Date.now();
        Comment.update({_id: data.comment_id},
        {$addToSet: {replies: data}},
        {multi: false})
        .exec()
        .then(() => {
            resolve();
        }).catch((err) => {
            reject("caught " + err);
        })
    })
}