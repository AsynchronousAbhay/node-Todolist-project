var express = require('express');
var router = express.Router();

const uuid = require("uuid").v4;

let LOCAL_DB = [
  {
    id: "23424-42342-453345",
    title: "recharge 5g",
    desc: "unlimited recharge pack for 3 months comes with 2gb/day along with unlimited calling..",
    deadline: " november 14",
  },
];

router.get('/', function (req, res, next) {
  res.render('show', { tasks: LOCAL_DB });
});


router.get('/create', function (req, res, next) {
  res.render('create');
});


router.post('/add', function (req, res, next) {

  // let id = uuid();

  const { title, desc } = req.body;

  if (title.length < 4 || desc.length < 15) {
    res.send("<h2>The length of your title and desc must be at least more than 4 and 15.</br><a href='/create'>BACK</a></h2>")
  };

  let deadline = new Date().toLocaleDateString("en-us",
    {
      day: 'numeric',
      month: "long",
      year: "numeric",
    }
  );

  let NewTask = {
    id: uuid(),
    title,
    desc,
    deadline,
  }

  LOCAL_DB.push(NewTask);

  // res.json({ ...req.body, deadline, id });

  res.redirect("/");

});

router.get('/delete/:id', function (req, res, next) {

  const id = req.params.id;

  const filtereddata = LOCAL_DB.filter(function (task) {
    return task.id !== id;
  });

  LOCAL_DB = filtereddata;

  // res.json(filtereddata);

  res.redirect('/');

});

router.get("/edit/:id", function (req, res, next) {
  const id = req.params.id;

  const filtereddata = LOCAL_DB.filter(function (task) {
    return task.id === id;
  });

  res.render("edit", { task: filtereddata[0] });
});

router.post('/edit/:id', function (req, res, next) {

  const id = req.params.id;

  const { title, desc } = req.body;

  const taskindex = LOCAL_DB.findIndex(function (task) {
    return task.id === id;
  });

  const activetask = { ...LOCAL_DB[taskindex], title, desc };

  LOCAL_DB[taskindex] = activetask;

  res.redirect('/');

});

module.exports = router;
