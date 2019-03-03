const Contractor = require("../models").Contractor;

module.exports ={
    list(req, res) {
        return Contractor
          .findAll({
            order: [
              ['createdAt', 'DESC'],
            ],
          })
          .then((contractors) => res.status(200).send(contractors))
          .catch((error) => { res.status(400).send(error); });
      },
    
      getById(req, res) {
        return Contractor
          .findById(req.params.id, {
          })
          .then((contractor) => {
            if (!contractor) {
              return res.status(404).send({
                message: 'Contractor not found.',
              });
            }
            return res.status(200).send(contractor);
          })
          .catch((error) => res.status(400).send(error));
      },

      add(req, res) {
        return Contractor
        .create({
            contractor_name: req.body.contractor_name,
            contractor_email: req.body.contractor_email,
            contractor_login: req.body.contractor_login,
            contractor_password: req.body.contractor_password,
          })
          .then((contractor) => res.status(201).send(contractor))
          .catch((error) => res.status(400).send(error));
      },

      update(req, res) {
        return Contractor
          .findById(req.params.id, {
          })
          .then(contractor => {
            if (!contractor) {
              return res.status(404).send({
                message: 'Contractor not found.',
              });
            }
            return contractor
              .update({
                contractor_name: req.body.contractor_name || contractor.contractor_name,
                contractor_email: req.body.contractor_email || contractor.contractor_email,
                contractor_login: req.body.contractor_login || contractor.contractor_login,
                contractor_password: req.body.contractor_password || contractor.contractor_password,
              })
              .then(() => res.status(200).send(contractor))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Contractor
          .findById(req.params.id)
          .then(contractor => {
            if (!contractor) {
              return res.status(400).send({
                message: 'Contractor not found.',
              });
            }
            return contractor
              .destroy()
              .then(() => res.status(200).send(contractor))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
}