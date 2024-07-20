'use strict';
const issue = require("./issue");

module.exports = function (app) {


  app.route('/api/issues/:project')
    .get(function (req, res){
      let project = req.params.project;
      let filters = req.query;
      issue.model.find({project})
        .then((issues) => {
          for (const [filterKey, filterValue] of Object.entries(filters)) {
            issues = issues.filter((issue) => filterKey === "_id" ? 
            issue[filterKey].equals(filterValue):
            issue[filterKey] === filterValue)
          }
          res.send(issues)
        })
        .catch(
          err => console.log(err)
        )
    })
    
    .post(function (req, res){
      let project = req.params.project;

      if (req.body.hasOwnProperty("issue_title") && req.body.hasOwnProperty("issue_text") && req.body.hasOwnProperty("created_by")) {
        const status = {
          ...req.body,
          assigned_to: req.body.assigned_to ? req.body.assigned_to : "",
          status_text: req.body.status_text ? req.body.status_text : "",
          created_on: new Date(),
          updated_on: new Date(),
          open: true,
          project
        }

        issue.model.create(status)
          .then((newIssue) => {
            res.json(newIssue);
          })
          .catch(
            err => console.log(err)
          )
      } else {
        res.json({ error: 'required field(s) missing' });
      }
    })
    
    .put(function (req, res){
      let project = req.params.project;
      if (!req.body.hasOwnProperty("_id")) {
        res.json({ error: 'missing _id' });
      } else if (Object.keys(req.body).length === 1) {
        res.json({ error: 'no update field(s) sent', '_id': req.body._id })
      } else {
        issue.model.findByIdAndUpdate(req.body._id, {...req.body, updated_on: new Date()})
             .then((matchingIssue) => {
              matchingIssue ?
                res.json({ result: 'successfully updated', '_id': req.body._id }) :
                res.json({ error: 'could not update', '_id': req.body._id })
              }
             )
             .catch(
              err => res.json({ error: 'could not update', '_id': req.body._id })
             )
      }
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      if (!req.body.hasOwnProperty("_id")) {
        res.json({ error: 'missing _id' });
      } else {
        issue.model.findByIdAndDelete(req.body._id)
             .then((matchingIssue) => {
              matchingIssue ?
                res.json({ result: 'successfully deleted', '_id': req.body._id }) :
                res.json({ error: 'could not delete', '_id': req.body._id })
             })
             .catch(
              err => res.json({ error: 'could not delete', '_id': req.body._id })
             )
      }
    });
    
};
