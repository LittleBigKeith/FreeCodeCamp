require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
mongoose.connect(process.env.MONGO_URI, {});

const exerciseSchema = new mongoose.Schema({
  description: String,
  duration: Number,
  date: Date
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}]
});

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

app.post("/api/users",
  function(req, res) {
    User.create({ username: req.body.username })
        .then((newUser) => {
          res.json(newUser);
        })
        .catch(
          err => console.log(err)
        )    
  }
)

app.get("/api/users",
  function(req, res) {
    User.find({})
        .then((users) => {
          res.json(users);
        })
        .catch(
          err => console.log(err)
        )
  }
)

app.post("/api/users/:_id/exercises",
  function(req, res) {
    User.findById(req.params._id).exec()
        .then((retrievedUser) => {
          const newExercise = {
            description: req.body.description,
            duration: Number(req.body.duration),
            date: req.body.date ? new Date(req.body.date) : new Date(),
          }
          Exercise.create(newExercise)
                  .then((newExercise) => {
                    retrievedUser.exercises.push(newExercise._id);
                    retrievedUser.save()
                                 .then(() => {
                                  res.json({
                                    username: retrievedUser.username,
                                    description: newExercise.description,
                                    duration: newExercise.duration,
                                    date: newExercise.date.toDateString(),
                                    _id: retrievedUser._id,
                                  })
                                })
                                 .catch(
                                  err => console.log(err)
                                 )
                  })
                  .catch (
                    err => console.log(err)
                  )
          })
        .catch(
          err => console.log(err)
        )
  }
)

app.get("/api/users/:_id/logs",
  function(req, res) {
  User.findById(req.params._id).exec()
      .then((retrievedUser) => {
        Exercise.find({_id: { $in: retrievedUser.exercises }}).exec()
        .then((exerciseList) => {
          exerciseList = exerciseList
            .filter((exercise) => req.query.from ? new Date(exercise.date) > new Date(req.query.from) : exercise)
            .filter((exercise) => req.query.to ? new Date(exercise.date) < new Date(req.query.to) : exercise)
            .map((exercise) => {
            return {
              description: exercise.description,
              duration: Number(exercise.duration),
              date: exercise.date.toDateString()}
          })
          res.json({
            username: retrievedUser.username,
            count: req.query.limit ? Number(req.query.limit) : exerciseList.length,
            _id: retrievedUser._id,
            log: req.query.limit ? exerciseList.slice(0, Number(req.query.limit)) : exerciseList,
          })
        })
        .catch(
          err => console.log(err)
        )
      })
      .catch(
        err => console.log(err)
      )
  }
)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
