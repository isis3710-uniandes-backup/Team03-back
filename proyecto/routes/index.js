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
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.get('/api/user/:log/:pas', userController.authenticate);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

router.get('/api/portfolio', portfolioController.list);
router.get('/api/portfolio/:id', portfolioController.getById);
router.get('/portfolio/:portfolio_url', portfolioController.getByUrl);
router.get('/api/portfolio/:id/user', portfolioController.getUserPortfolio);
router.post('/api/portfolio', portfolioController.add);
router.put('/api/portfolio/:id', portfolioController.update);
router.delete('/api/portfolio/:id', portfolioController.delete);

router.get('/api/entry', entryController.list);
router.get('/api/entry/:id', entryController.getById);
router.post('/api/entry', entryController.add);
router.put('/api/entry/:id', entryController.update);
router.delete('/api/entry/:id', entryController.delete);

//----------------//
//----Nixon-------//
//----------------//
router.get('/api/contractor', contractorController.list);
router.get('/api/contractor/:id', contractorController.getById);
router.get('/api/contractor/:log/:pas', contractorController.authenticate)
router.post('/api/contractor', contractorController.add);
router.put('/api/contractor/:id', contractorController.update);
router.delete('/api/contractor/:id', contractorController.delete);

var routerCreditCard=express.Router({mergeParams: true});
var routerOffer=express.Router({mergeParams: true});
router.use('/api/contractor/:id/creditcard', routerCreditCard);
router.use('/api/contractor/:id/offer',routerOffer );

routerCreditCard.get('/', creditCardController.list);
routerCreditCard.get('/:idCreditCard', creditCardController.getById);
routerCreditCard.post('/', creditCardController.add);
routerCreditCard.put('/:idCreditCard', creditCardController.update);
routerCreditCard.delete('/:idCreditCard', creditCardController.delete);

router.get('/api/offer', offerController.listAll);
router.get('/api/offer/:id',offerController.getByPk);
routerOffer.get('/', offerController.list);
routerOffer.get('/:idOffer', offerController.getById);
routerOffer.post('/', offerController.add);
routerOffer.put('/:idOffer', offerController.update);
routerOffer.delete('/:idOffer', offerController.delete);
//----------------//
//---End--Nixon
//----------------//
router.get('/api/offer', offerController.list)

router.get('/api/application', applicationController.list);
router.get('/api/application/:id', applicationController.getById);
router.get('/api/application/:id/user', applicationController.getUserApplication)
router.post('/api/application', applicationController.add);
router.put('/api/application/:id', applicationController.update);
router.delete('/api/application/:id', applicationController.delete);

router.get('/api/contract', contractController.list);
router.get('/api/contract/:id', contractController.getById);
router.get('/api/contract/:id/contractor', contractController.getContractorContract);
router.post('/api/contract', contractController.add);
router.put('/api/contract/:id', contractController.update);
router.delete('/api/contract/:id', contractController.delete);

router.get('/api/service', serviceController.list);
router.get('/api/service/:id', serviceController.getById);
router.get('/api/service/:id/user', serviceController.getUserService)
router.post('/api/service', serviceController.add);
router.put('/api/service/:id', serviceController.update);
router.delete('/api/service/:id', serviceController.delete);

module.exports = router;
