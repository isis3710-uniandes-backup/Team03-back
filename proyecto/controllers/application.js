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
            application_comments: req.body.application_comments,
            application_price: req.body.application_price,
            UserId: req.body.UserId,
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
                application_comments: req.body.application_comments || application.application_comments,
                application_price: req.body.application_price || application.application_price,
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