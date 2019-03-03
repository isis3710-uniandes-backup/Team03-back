const Application = require("../models").Application;

module.exports ={
    list(req, res) {
        return Application
          .findAll({
            order: [
              ['createdAt', 'DESC'],
            ],
          })
          .then((applications) => res.status(200).send(applications))
          .catch((error) => { res.status(400).send(error); });
      },
    
      getById(req, res) {
        return Application
          .findById(req.params.id, {
          })
          .then((application) => {
            if (!application) {
              return res.status(404).send({
                message: 'Application not found.',
              });
            }
            return res.status(200).send(application);
          })
          .catch((error) => res.status(400).send(error));
      },

      add(req, res) {
        return Application
        .create({
            contract_terms: req.body.contract_terms,
            contract_comments: req.body.contract_comments,
            contract_begindate: req.body.contract_begindate,
            contract_enddate: req.body.contract_enddate,
          })
          .then((application) => res.status(201).send(application))
          .catch((error) => res.status(400).send(error));
      },

      update(req, res) {
        return Application
          .findById(req.params.id, {
          })
          .then(application => {
            if (!application) {
              return res.status(404).send({
                message: 'Application not found.',
              });
            }
            return application
              .update({
                contract_terms: req.body.contract_terms || application.contract_terms,
                contract_comments: req.body.contract_comments || application.contract_comments,
                contract_begindate: req.body.contract_begindate || application.contract_begindate,
                contract_enddate: req.body.contract_enddate || application.contract_enddate,
              })
              .then(() => res.status(200).send(application))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Application
          .findById(req.params.id)
          .then(application => {
            if (!application) {
              return res.status(400).send({
                message: 'Application not found.',
              });
            }
            return application
              .destroy()
              .then(() => res.status(200).send(application))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
}