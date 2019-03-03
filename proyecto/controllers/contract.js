const Contract = require("../models").Contract;

module.exports ={
    list(req, res) {
        return Contract
          .findAll({
            order: [
              ['createdAt', 'DESC'],
            ],
          })
          .then((contracts) => res.status(200).send(contracts))
          .catch((error) => { res.status(400).send(error); });
      },
    
      getById(req, res) {
        return Contract
          .findById(req.params.id, {
          })
          .then((contract) => {
            if (!contract) {
              return res.status(404).send({
                message: 'Contract not found.',
              });
            }
            return res.status(200).send(contract);
          })
          .catch((error) => res.status(400).send(error));
      },

      add(req, res) {
        return Contract
        .create({
            contract_terms: req.body.contract_terms,
            contract_comments: req.body.contract_comments,
            contract_begindate: req.body.contract_begindate,
            contract_enddate: req.body.contract_enddate,
            ContractorId: req.body.ContractorId,
          })
          .then((contract) => res.status(201).send(contract))
          .catch((error) => res.status(400).send(error));
      },

      update(req, res) {
        return Contract
          .findById(req.params.id, {
          })
          .then(contract => {
            if (!contract) {
              return res.status(404).send({
                message: 'Contract not found.',
              });
            }
            return contract
              .update({
                contract_terms: req.body.contract_terms || contract.contract_terms,
                contract_comments: req.body.contract_comments || contract.contract_comments,
                contract_begindate: req.body.contract_begindate || contract.contract_begindate,
                contract_enddate: req.body.contract_enddate || contract.contract_enddate,
              })
              .then(() => res.status(200).send(contract))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Contract
          .findById(req.params.id)
          .then(contract => {
            if (!contract) {
              return res.status(400).send({
                message: 'Contract not found.',
              });
            }
            return contract
              .destroy()
              .then(() => res.status(200).send(contract))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
}