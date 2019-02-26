const Entry = require("../models").Entry;

module.exports ={
    list(req, res) {
        return Entry
          .findAll({
            order: [
              ['createdAt', 'DESC'],
            ],
          })
          .then((entries) => res.status(200).send(entries))
          .catch((error) => { res.status(400).send(error); });
      },
    
      getById(req, res) {
        return Entry
          .findById(req.params.id, {
          })
          .then((entry) => {
            if (!entry) {
              return res.status(404).send({
                message: 'Entry not found.',
              });
            }
            return res.status(200).send(entry);
          })
          .catch((error) => res.status(400).send(error));
      },

      add(req, res) {
        return Entry
          .create({
            entry_name: req.body.entry_name,
            entry_description: req.body.entry_description,
            entry_url: req.body.entry_url,
            entry_hashtags: req.body.entry_hashtags,
          })
          .then((entry) => res.status(201).send(entry))
          .catch((error) => res.status(400).send(error));
      },

      update(req, res) {
        return Entry
          .findById(req.params.id, {
          })
          .then(entry => {
            if (!entry) {
              return res.status(404).send({
                message: 'Entry not found.',
              });
            }
            return entry
              .update({
                entry_name: req.body.entry_name || entry.entry_name,
                entry_description: req.body.entry_description || entry.entry_description,
                entry_url: req.body.entry_url || entry.entry_url,
                entry_hashtags: req.body.entry_hashtags || entry.entry_hashtags,
              })
              .then(() => res.status(200).send(entry))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Entry
          .findById(req.params.id)
          .then(entry => {
            if (!entry) {
              return res.status(400).send({
                message: 'Entry not found.',
              });
            }
            return entry
              .destroy()
              .then(() => res.status(200).send(entry))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
}