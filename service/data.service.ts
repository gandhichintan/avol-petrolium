import sqlite3 = require("sqlite3-offline");
import fs = require("fs");




export class DataContext {

    db: any
    sqlite: any;
    static dbPath: string;
    constructor() {
        console.log("executing constructor");
        this.sqlite = sqlite3.verbose();

        this.db = new sqlite3.Database(DataContext.dbPath, (err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log('database connected successfully..!!');
        });

    }

    createDbFileIfNotExists = () => {
        console.log('checking file exists or not');
        if (!fs.existsSync(DataContext.dbPath)) {
            console.log("file not found creating one");
            console.log(DataContext.dbPath);

            fs.open(DataContext.dbPath, "a", (err, fd) => {
                if (err) {
                    console.log(err.message);
                }
            });
        }
    }

    createDatabaseIfNotExists = () => {
        if (!fs.existsSync(DataContext.dbPath)) {
            this.db.serialize(() => {
                this.db.run(this.createIvoiceTable())
                    .run(this.createPurchaseTable())
                    .run(this.createItemTable())
                    .run(this.createSettingsTable());
            });

            this.db.close();
        }
    }

    private createIvoiceTable = () => {
        var query = `CREATE TABLE Invoice
                (
                    id integer primary key autoincrement,
                    reverseCharge text,
                    invioceDate Date,
                    state text,
                    stateCode integer,
                    transportationMode text,
                    vehicleNUmber text,
                    dateOfSupply date
                    placeOfSupply text,
                    customerName text,
                    customerAddress text,
                    consigneeName text,
                    consigneeAddress text,
                    hsnCode integer
                )`;

        return query;
    }

    private createPurchaseTable = () => {
        var query = `CREATE TABLE Purchase
                (
                    id integer primary key autoincrement,
                    item text,
                    type Date,
                    quantity text
                )`;
        return query;
    }

    private createItemTable = () => {
        var query = `CREATE TABLE Item
                    (
                        id integer primary key autoincrement,
                        name text,
                        packageType Date,
                        quantity text,
                        price real,
                        amount real,
                        discount real,
                        amountAfterDiscount real,
                        cgst real,
                        sgst real,
                        total real
                    )`;
        return query;
    }

    private createSettingsTable = () => {
        var query = `CREATE TABLE Settings
                    (
                        id integer primary key autoincrement,
                        key text,
                        value text
                    )`;
    }

    public executeQuery = (query: any, param: any[]) => {
        this.db = new sqlite3.Database(DataContext.dbPath, (err) => {
            if (err) {
                console.log(err.message);
                return;
            }

            console.log("executing Query : ",query);
            var result = this.db.run(query, param, this.handleError);
            return result;
        });
 
    }

    private handleError = (err) => {
        if (err) {
            return console.error(err.message);
        }
    }
}