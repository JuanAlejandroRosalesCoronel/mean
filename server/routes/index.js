var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next){
    res.render(path.join(__dirname, '../../client/UserManagement/dist/UserManagement/')+'index.html');
});


module.exports = router;
