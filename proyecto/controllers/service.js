const Service = require("../models").Service;

module.exports ={
    list(req, res) {
        return Service
          .findAll({
            order: [
              ['createdAt', 'DESC'],
            ],
          })
          .then((services) => res.status(200).send(services))
          .catch((error) => { res.status(400).send(error); });
      },
    
      getById(req, res) {
        return Service
          .findById(req.params.id, {
          })
          .then((service) => {
            if (!service) {
              return res.status(404).send({
                message: 'Service not found.',
              });
            }
            return res.status(200).send(service);
          })
          .catch((error) => res.status(400).send(error));
      },

      add(req, res) {
        return Service
        .create({
            service_name: req.body.service_name,
            service_description: req.body.service_description,
            service_exampleurl: req.body.service_exampleurl,
            service_price: req.body.service_price,
            UserId: req.body.UserId
          })
          .then((service) => res.status(201).send(service))
          .catch((error) => res.status(400).send(error));
      },

      update(req, res) {
        return Service
          .findById(req.params.id, {
          })
          .then(service => {
            if (!service) {
              return res.status(404).send({
                message: 'Service not found.',
              });
            }
            return service
              .update({
                service_name: req.body.service_name || service.service_name,
                service_description: req.body.service_description || service.service_description,
                service_exampleurl: req.body.service_exampleurl || service.service_exampleurl,
                service_price: req.body.service_price || service.service_price,
              })
              .then(() => res.status(200).send(service))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Service
          .findById(req.params.id)
          .then(service => {
            if (!service) {
              return res.status(400).send({
                message: 'Service not found.',
              });
            }
            return service
              .destroy()
              .then(() => res.status(200).send(service))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
}