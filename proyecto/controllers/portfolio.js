const Portfolio = require("../models").Portfolio;
const Entry = require("../models").Entry;

module.exports ={
    list(req, res) {
        return Portfolio
          .findAll({
            order: [
              ['createdAt', 'DESC'],
            ],
          })
          .then((portfolios) => res.status(200).send(portfolios))
          .catch((error) => { res.status(400).send(error); });
      },
    
      getById(req, res) {
        return Portfolio
          .findById(req.params.id, {
            include: [Entry],
          })
          .then((portfolio) => {
            if (!portfolio) {
              return res.status(404).send({
                message: 'Portfolio not found.',
              });
            }
            return res.status(200).send(portfolio);
          })
          .catch((error) => res.status(400).send(error));
      },

      getByUrl(req, res) {
        return Portfolio
          .findAll({
            where: {
              portfolio_url: req.params.portfolio_url
            },
            include: [Entry],
            order: [
              ['createdAt', 'DESC'],
              [Entry, 'createdAt', 'DESC'],
            ],
          })
          .then((portfolios) => res.status(200).send(portfolios))
          .catch((error) => { res.status(400).send(error); });
      },

      add(req, res) {
        return Portfolio
          .create({
            portfolio_name: req.body.portfolio_name,
            portfolio_type: req.body.portfolio_type,
            portfolio_description: req.body.portfolio_description,
            portfolio_url: req.body.portfolio_url,
            portfolio_banner: req.body.portfolio_banner,
            UserId: req.body.UserId,
          })
          .then((portfolio) => res.status(201).send(portfolio))
          .catch((error) => res.status(400).send(error));
      },

      update(req, res) {
        return Portfolio
          .findById(req.params.id, {
          })
          .then(portfolio => {
            if (!portfolio) {
              return res.status(404).send({
                message: 'Portfolio not found.',
              });
            }
            return portfolio
              .update({
                portfolio_name: req.body.portfolio_name || portfolio.portfolio_name,
                portfolio_description: req.body.portfolio_description || portfolio.portfolio_description,
                portfolio_type: req.body.portfolio_type || portfolio.portfolio_type,
                portfolio_url: req.body.portfolio_url || portfolio.portfolio_url,
                portfolio_banner: req.body.portfolio_banner || portfolio.portfolio_banner,
              })
              .then(() => res.status(200).send(portfolio))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Portfolio
          .findById(req.params.id)
          .then(portfolio => {
            if (!portfolio) {
              return res.status(400).send({
                message: 'Portfolio not found.',
              });
            }
            return portfolio
              .destroy()
              .then(() => res.status(200).send(portfolio))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },

      getUserPortfolio(req, res) {
        return Portfolio
        .findAll({
          where: {
            UserId: req.params.id,
          }
        })
        .then( portfolios => {
          if (!portfolios) {
              return res.status(404).send({
                message: 'Portfolios not found.',
            })
          }
          else {
              return res.status(200).send(portfolios);
          }
        })
        .catch( error => res.status(400).send(error));
      }
}