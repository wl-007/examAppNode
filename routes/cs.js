var express = require('express');
var router = express.Router();
const ResponseEntity =require("../utils/ResponseEntity")
/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  try {
    res.send(ResponseEntity.success({msg:"",data:""}))
  } catch (error) {
    res.send(ResponseEntity.error())
  }
});

module.exports = router;
