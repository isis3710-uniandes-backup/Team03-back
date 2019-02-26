'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Contractors", deps: []
 * createTable "Users", deps: []
 * createTable "Offers", deps: [Contractors]
 * createTable "CreditCards", deps: [Contractors]
 * createTable "Portfolios", deps: [Users]
 * createTable "Contracts", deps: [Contractors]
 * createTable "Entries", deps: [Portfolios]
 * createTable "Services", deps: [Users]
 * createTable "Applications", deps: [Offers, Users]
 * createTable "ApplicationEntry", deps: [Entries, Applications]
 * createTable "OfferService", deps: [Services, Offers]
 *
 **/

var info = {
    "revision": 1,
    "name": "init",
    "created": "2019-02-26T01:54:23.805Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Contractors",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "contractor_name": {
                    "type": Sequelize.STRING,
                    "field": "contractor_name"
                },
                "contractor_email": {
                    "type": Sequelize.STRING,
                    "field": "contractor_email"
                },
                "contractor_login": {
                    "type": Sequelize.STRING,
                    "field": "contractor_login"
                },
                "contractor_password": {
                    "type": Sequelize.STRING,
                    "field": "contractor_password"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "user_names": {
                    "type": Sequelize.STRING,
                    "field": "user_names"
                },
                "user_lastnames": {
                    "type": Sequelize.STRING,
                    "field": "user_lastnames"
                },
                "user_email": {
                    "type": Sequelize.STRING,
                    "field": "user_email"
                },
                "user_login": {
                    "type": Sequelize.STRING,
                    "field": "user_login"
                },
                "user_password": {
                    "type": Sequelize.STRING,
                    "field": "user_password"
                },
                "user_birthdate": {
                    "type": Sequelize.DATE,
                    "field": "user_birthdate"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Offers",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "offer_name": {
                    "type": Sequelize.STRING,
                    "field": "offer_name"
                },
                "offer_terms": {
                    "type": Sequelize.STRING,
                    "field": "offer_terms"
                },
                "offer_banner": {
                    "type": Sequelize.STRING,
                    "field": "offer_banner"
                },
                "offer_begindate": {
                    "type": Sequelize.DATE,
                    "field": "offer_begindate"
                },
                "offer_enddate": {
                    "type": Sequelize.DATE,
                    "field": "offer_enddate"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "ContractorId": {
                    "type": Sequelize.INTEGER,
                    "field": "ContractorId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Contractors",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "CreditCards",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "creditcard_name": {
                    "type": Sequelize.STRING,
                    "field": "creditcard_name"
                },
                "creditcard_number": {
                    "type": Sequelize.STRING,
                    "field": "creditcard_number"
                },
                "creditcard_expirationdate": {
                    "type": Sequelize.STRING,
                    "field": "creditcard_expirationdate"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "ContractorId": {
                    "type": Sequelize.INTEGER,
                    "field": "ContractorId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Contractors",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Portfolios",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "portfolio_name": {
                    "type": Sequelize.STRING,
                    "field": "portfolio_name"
                },
                "portfolio_type": {
                    "type": Sequelize.STRING,
                    "field": "portfolio_type"
                },
                "portfolio_description": {
                    "type": Sequelize.STRING,
                    "field": "portfolio_description"
                },
                "portfolio_url": {
                    "type": Sequelize.STRING,
                    "field": "portfolio_url"
                },
                "portfolio_banner": {
                    "type": Sequelize.STRING,
                    "field": "portfolio_banner"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Contracts",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "contract_terms": {
                    "type": Sequelize.STRING,
                    "field": "contract_terms"
                },
                "contract_comments": {
                    "type": Sequelize.STRING,
                    "field": "contract_comments"
                },
                "contract_begindate": {
                    "type": Sequelize.DATE,
                    "field": "contract_begindate"
                },
                "contract_enddate": {
                    "type": Sequelize.DATE,
                    "field": "contract_enddate"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "ContractorId": {
                    "type": Sequelize.INTEGER,
                    "field": "ContractorId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Contractors",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Entries",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "entry_name": {
                    "type": Sequelize.STRING,
                    "field": "entry_name"
                },
                "entry_description": {
                    "type": Sequelize.STRING,
                    "field": "entry_description"
                },
                "entry_url": {
                    "type": Sequelize.STRING,
                    "field": "entry_url"
                },
                "entry_hashtags": {
                    "type": Sequelize.STRING,
                    "field": "entry_hashtags"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "PortfolioId": {
                    "type": Sequelize.INTEGER,
                    "field": "PortfolioId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Portfolios",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Services",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "service_name": {
                    "type": Sequelize.STRING,
                    "field": "service_name"
                },
                "service_description": {
                    "type": Sequelize.STRING,
                    "field": "service_description"
                },
                "service_exampleurl": {
                    "type": Sequelize.STRING,
                    "field": "service_exampleurl"
                },
                "service_price": {
                    "type": Sequelize.FLOAT,
                    "field": "service_price"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Applications",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "application_comments": {
                    "type": Sequelize.STRING,
                    "field": "application_comments"
                },
                "application_price": {
                    "type": Sequelize.FLOAT,
                    "field": "application_price"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "OfferId": {
                    "type": Sequelize.INTEGER,
                    "field": "OfferId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Offers",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "ApplicationEntry",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "EntryId": {
                    "type": Sequelize.INTEGER,
                    "field": "EntryId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Entries",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "ApplicationId": {
                    "type": Sequelize.INTEGER,
                    "field": "ApplicationId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Applications",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "OfferService",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "ServiceId": {
                    "type": Sequelize.INTEGER,
                    "field": "ServiceId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Services",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "OfferId": {
                    "type": Sequelize.INTEGER,
                    "field": "OfferId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Offers",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
