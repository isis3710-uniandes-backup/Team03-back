'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "OfferService"
 * createTable "ContractService", deps: [Services, Contracts]
 * addColumn "ContractId" to table "Services"
 * changeColumn "UserId" on table "Applications"
 * changeColumn "UserId" on table "Applications"
 * changeColumn "ContractorId" on table "Contracts"
 * changeColumn "ContractorId" on table "Contracts"
 *
 **/

var info = {
    "revision": 2,
    "name": "initial_migration",
    "created": "2019-03-03T19:28:08.594Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "dropTable",
        params: ["OfferService"]
    },
    {
        fn: "createTable",
        params: [
            "ContractService",
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
                "ContractId": {
                    "type": Sequelize.INTEGER,
                    "field": "ContractId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Contracts",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Services",
            "ContractId",
            {
                "type": Sequelize.INTEGER,
                "field": "ContractId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Contracts",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Applications",
            "UserId",
            {
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
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Applications",
            "UserId",
            {
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
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Contracts",
            "ContractorId",
            {
                "type": Sequelize.INTEGER,
                "field": "ContractorId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Contractors",
                    "key": "id"
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Contracts",
            "ContractorId",
            {
                "type": Sequelize.INTEGER,
                "field": "ContractorId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Contractors",
                    "key": "id"
                },
                "allowNull": false
            }
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
