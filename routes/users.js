var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET Userlist page. */
router.get('/user-list-table', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.render('user-list', {
            "userList" : docs
        });
    });
});

/* GET New User page. */
router.get('/new-user', function(req, res) {
    res.render('new-user', { title: 'Add New User' });
});

router.post('/add-user', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    console.log(req.body);
    // Get our form values. These rely on the "name" attributes
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;

    // Set our collection
    var collection = db.get('users');

    // Submit to the DB
    collection.insert({
        "name" : name,
        "username" : username,
        "password" : password
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("user-list-table");
        }
    });
});

module.exports = router;
