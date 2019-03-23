const CreditCard = require("../models").CreditCard;

module.exports ={
    list(req, res) {
        return CreditCard
          .findAll({where: {
              ContractorId: req.params.id,
              id: req.params.idCreditCard},
            order: [
              ['createdAt', 'DESC'],
            ],
          })
          .then((creditcards) => res.status(200).send(creditcards))
          .catch((error) => { res.status(400).send(error); });
      },
    
      getById(req, res) {
        return CreditCard
          .findOne({
            where: {
              ContractorId: req.params.id,
              id: req.params.idCreditCard
            }})
          .then((creditcard) => {
            if (!creditcard) {
              return res.status(404).send({
                message: 'CreditCard not found.',
              });
            }
            return res.status(200).send(creditcard);
          })
          .catch((error) => res.status(400).send(error));
      },

      add(req, res) {
        return CreditCard
          .create({
            creditcard_name: req.body.creditcard_name,
            creditcard_number: req.body.creditcard_number,
            creditcard_expirationdate: req.body.creditcard_expirationdate,
            ContractorId: req.body.ContractorId
          })
          .then((creditcard) => res.status(201).send(creditcard))
          .catch((error) => res.status(400).send(error));
      },

      update(req, res) {
        return CreditCard
          .findOne({
            where: {
              ContractorId: req.params.id,
              id: req.params.idCreditCard
            }})
          .then(creditcard => {
            if (!creditcard) {
              return res.status(404).send({
                message: 'CreditCard not found.',
              });
            }
            return creditcard
              .update({
                creditcard_name: req.body.creditcard_name || creditcard.creditcard_name,
                creditcard_number: req.body.creditcard_number || creditcard.creditcard_number,
                creditcard_expirationdate: req.body.creditcard_expirationdate || creditcard.creditcard_expirationdate,
              })
              .then(() => res.status(200).send(creditcard))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return CreditCard
          .findOne({
            where: {
              ContractorId: req.params.id,
              id: req.params.idCreditCard
            }})
          .then(creditcard => {
            if (!creditcard) {
              return res.status(400).send({
                message: 'CreditCard not found.',
              });
            }
            return creditcard
              .destroy()
              .then(() => res.status(200).send(creditcard))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
}