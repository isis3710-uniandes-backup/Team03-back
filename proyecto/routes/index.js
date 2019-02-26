var express = require('express');
var router = express.Router();
const userController = require('../controllers').user;
const entryController = require('../controllers').entry;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

router.get('/api/entry', entryController.list);
router.get('/api/entry/:id', entryController.getById);
router.post('/api/entry', entryController.add);
router.put('/api/entry/:id', entryController.update);
router.delete('/api/entry/:id', entryController.delete);

module.exports = router;
