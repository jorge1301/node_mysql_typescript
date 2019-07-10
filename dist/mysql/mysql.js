"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
require('dotenv').config();
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: process.env.LOCALHOST_MYSQL,
            user: process.env.USER_MYSQL,
            password: process.env.PASSWORD_MYSQL,
            database: process.env.DATABASE_URI
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('base de datos online');
        });
    }
}
exports.default = MySQL;
