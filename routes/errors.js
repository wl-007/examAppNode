var express = require('express');
var router = express.Router();
let errorsController =require('../controllers/ErrorsController')
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/find',errorsController.find)
router.post('/add',errorsController.add)
router.delete('/del',errorsController.del)
module.exports = router;