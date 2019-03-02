const CreditCard = require("../models").CreditCard;

module.exports ={
    list(req, res) {
        return CreditCard
          .findAll({
            order: [
              ['createdAt', 'DESC'],
            ],
          })
          .then((cards) => res.status(200).send(cards))
          .catch((error) => { res.status(400).send(error); });
      },
    
      getById(req, res) {
        return CreditCard
          .findById(req.params.id)
          .then((cards) => {
            if (!cards) {
              return res.status(404).send({
                message: 'Credit Card not found.',
              });
            }
            return res.status(200).send(cards);
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
          .then((card) => res.status(201).send(card))
          .catch((error) => res.status(400).send(error));
      },

      update(req, res) {
        return CreditCard
          .findById(req.params.id, {
          })
          .then(cards => {
            if (!cards) {
              return res.status(404).send({
                message: 'Credit cards not found.',
              });
            }
            return CreditCard
              .update({
                creditcard_name: req.body.creditcard_name || cards.creditcard_name,
                creditcard_number: req.body.creditcard_number || cards.creditcard_number ,
                creditcard_expirationdate: req.body.creditcard_expirationdate || cards.creditcard_expirationdate
              })
              .then(() => res.status(200).send(cards))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return CreditCard
          .findById(req.params.id)
          .then(cards => {
            if (!cards) {
              return res.status(400).send({
                message: 'Credit cards not found.',
              });
            }
            return cards
              .destroy()
              .then(() => res.status(200).send(cards))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
}