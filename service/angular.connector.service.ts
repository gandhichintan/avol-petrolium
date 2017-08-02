import db = require("../service/data.service");
import electron = require("electron");
let ipcMain = electron.ipcMain;

let query = require("../data.config.json");


export class DbListener {

    constructor() {
    }

    private executeRequest = (args: any[]) => {
        var dataContext = new db.DataContext();
        var arg = args[0];
        var result = dataContext.executeQuery(query[arg.queryKey], arg.param);
        return result;
    }

    addListener = () => {
        ipcMain.on("db-operation", (event, args) => {


            var result = this.executeRequest(args);
            event.sender.send(args[0].receiverKey, result);
        });
    }
}
