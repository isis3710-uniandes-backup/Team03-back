var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth');
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
router.get('/api/user',authMiddleware.checkAuth, userController.list);
router.get('/api/user/:id',authMiddleware.checkAuth, userController.getById);
router.post('/api/user/login', userController.authenticate);
router.post('/api/user', userController.add);
router.put('/api/user/:id',authMiddleware.checkAuth, userController.update);
router.delete('/api/user/:id',authMiddleware.checkAuth, userController.delete);

router.get('/api/portfolio',authMiddleware.checkAuth, portfolioController.list);
router.get('/api/portfolio/:id',authMiddleware.checkAuth, portfolioController.getById);
router.get('/portfolio/:portfolio_url',authMiddleware.checkAuth, portfolioController.getByUrl);
router.get('/api/portfolio/:id/user',authMiddleware.checkAuth, portfolioController.getUserPortfolio);
router.post('/api/portfolio',authMiddleware.checkAuth, portfolioController.add);
router.put('/api/portfolio/:id',authMiddleware.checkAuth, portfolioController.update);
router.delete('/api/portfolio/:id',authMiddleware.checkAuth, portfolioController.delete);

router.get('/api/entry',authMiddleware.checkAuth, entryController.list);
router.get('/api/entry/:id',authMiddleware.checkAuth, entryController.getById);
router.post('/api/entry',authMiddleware.checkAuth, entryController.add);
router.put('/api/entry/:id',authMiddleware.checkAuth, entryController.update);
router.delete('/api/entry/:id',authMiddleware.checkAuth, entryController.delete);

//----------------//
//----Nixon-------//
//----------------//
router.get('/api/contractor',authMiddleware.checkAuth, contractorController.list);
router.get('/api/contractor/:id',authMiddleware.checkAuth, contractorController.getById);
router.post('/api/contractor/login', contractorController.authenticate);
router.post('/api/contractor', contractorController.add);
router.put('/api/contractor/:id',authMiddleware.checkAuth, contractorController.update);
router.delete('/api/contractor/:id',authMiddleware.checkAuth, contractorController.delete);

var routerCreditCard=express.Router({mergeParams: true});
var routerOffer=express.Router({mergeParams: true});
router.use('/api/contractor/:id/creditcard',authMiddleware.checkAuth, routerCreditCard);
router.use('/api/contractor/:id/offer',authMiddleware.checkAuth,routerOffer );

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

router.get('/api/application',authMiddleware.checkAuth, applicationController.list);
router.get('/api/application/:id',authMiddleware.checkAuth, applicationController.getById);
router.get('/api/application/:id/user',authMiddleware.checkAuth, applicationController.getUserApplication)
router.post('/api/application',authMiddleware.checkAuth, applicationController.add);
router.put('/api/application/:id',authMiddleware.checkAuth, applicationController.update);
router.delete('/api/application/:id',authMiddleware.checkAuth, applicationController.delete);

router.get('/api/contract',authMiddleware.checkAuth, contractController.list);
router.get('/api/contract/:id',authMiddleware.checkAuth, contractController.getById);
router.get('/api/contract/:id/contractor',authMiddleware.checkAuth, contractController.getContractorContract);
router.post('/api/contract',authMiddleware.checkAuth, contractController.add);
router.put('/api/contract/:id',authMiddleware.checkAuth, contractController.update);
router.delete('/api/contract/:id',authMiddleware.checkAuth, contractController.delete);

router.get('/api/service',authMiddleware.checkAuth, serviceController.list);
router.get('/api/service/:id',authMiddleware.checkAuth, serviceController.getById);
router.get('/api/service/:id/user',authMiddleware.checkAuth, serviceController.getUserService)
router.post('/api/service',authMiddleware.checkAuth, serviceController.add);
router.put('/api/service/:id',authMiddleware.checkAuth, serviceController.update);
router.delete('/api/service/:id',authMiddleware.checkAuth, serviceController.delete);

module.exports = router;
