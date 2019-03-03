var express = require('express');
var router = express.Router();
const userController = require('../controllers').user;
const portfolioController = require('../controllers').portfolio;
const entryController = require('../controllers').entry;
const contractorController = require('../controllers').contractor;
const creditCardController = require('../controllers').creditcard;
const offerController = require('../controllers').offer;
const applicationController = require('../controllers').application;
const contractController = require('../controllers').contract;
const serviceController = require('../controllers').service;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

router.get('/api/portfolio', portfolioController.list);
router.get('/api/portfolio/:id', portfolioController.getById);
router.post('/api/portfolio', portfolioController.add);
router.put('/api/portfolio/:id', portfolioController.update);
router.delete('/api/portfolio/:id', portfolioController.delete);

router.get('/api/entry', entryController.list);
router.get('/api/entry/:id', entryController.getById);
router.post('/api/entry', entryController.add);
router.put('/api/entry/:id', entryController.update);
router.delete('/api/entry/:id', entryController.delete);

router.get('/api/contractor', contractorController.list);
router.get('/api/contractor/:id', contractorController.getById);
router.post('/api/contractor', contractorController.add);
router.put('/api/contractor/:id', contractorController.update);
router.delete('/api/contractor/:id', contractorController.delete);

router.get('/api/creditcard', creditCardController.list);
router.get('/api/creditcard/:id', creditCardController.getById);
router.post('/api/creditcard', creditCardController.add);
router.put('/api/creditcard/:id', creditCardController.update);
router.delete('/api/creditcard/:id', creditCardController.delete);

router.get('/api/offer', offerController.list);
router.get('/api/offer/:id', offerController.getById);
router.post('/api/offer', offerController.add);
router.put('/api/offer/:id', offerController.update);
router.delete('/api/offer/:id', offerController.delete);

router.get('/api/application', applicationController.list);
router.get('/api/application/:id', applicationController.getById);
router.post('/api/application', applicationController.add);
router.put('/api/application/:id', applicationController.update);
router.delete('/api/application/:id', applicationController.delete);

router.get('/api/contract', contractController.list);
router.get('/api/contract/:id', contractController.getById);
router.post('/api/contract', contractController.add);
router.put('/api/contract/:id', contractController.update);
router.delete('/api/contract/:id', contractController.delete);

router.get('/api/service', serviceController.list);
router.get('/api/service/:id', serviceController.getById);
router.post('/api/service', serviceController.add);
router.put('/api/service/:id', serviceController.update);
router.delete('/api/service/:id', serviceController.delete);

module.exports = router;
