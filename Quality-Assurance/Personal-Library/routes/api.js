/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const book = require("./book");

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      book.model.find({})
        .then((bookList) => {
          res.json(bookList.map((book) => {
            return {
              title: book.title,
              _id: book._id,
              commentcount: book.comments.length,
            }
          }));
        })
    })
    
    .post(function (req, res){
      if (!req.body.hasOwnProperty("title") || req.body.title.length === 0) {
        res.send("missing required field title");
      } else {
        let title = req.body.title;
        //response will contain new book object including atleast _id and title 
        book.model.create({title})
          .then((newBook) => {
            res.json({
              title,
              comments: [],
              _id: newBook._id,
            });
          })
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      book.model.deleteMany({})
        .then((allBooks) => {
          if (allBooks) {
            res.send("complete delete successful");
          }
        })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      book.model.findOne({_id: bookid}).exec()
        .then((matchingBook) => {
          if (matchingBook) {
            res.json(matchingBook);
          } else {
            res.send("no book exists");
          }
        })

    })
    
    .post(function(req, res){
      if (!req.body.hasOwnProperty("comment")) {
        res.send("missing required field comment");
      } else {
        let bookid = req.params.id;
        let comment = req.body.comment;
        //json res format same as .get
        book.model.findOneAndUpdate({_id: bookid}, {$push: {"comments": comment}}).exec()
        .then((matchingBook) => {
          if (matchingBook) {
            matchingBook.comments.push(comment);
            res.json(matchingBook);
          } else {
            res.send("no book exists");
          }
        })
      }
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      book.model.findOneAndDelete({_id: bookid}).exec()
        .then((matchingBook) => {
          matchingBook ? res.send("delete successful") : res.send("no book exists");
        })
    });
  
};
