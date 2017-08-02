import { Component, OnInit, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';
import notificationService = require('../../../assets/js/notify.js');
import { ElectronService } from "ngx-electron";
import { Utils } from "../../service/util";

import { Item } from "../../models/item";
import { Invoice } from "../../models/invoice";


declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'invoice-cmp',
    templateUrl: 'invoice.component.html'
})

export class InvoiceComponent implements OnInit {
    item: Item;
    items: Item[];
    invoice: Invoice;
    editItem: string;
    editItemText: string;
    constructor(private _electronService: ElectronService, private _utils: Utils) {
        this.invoice = new Invoice();
        this.invoice.reverseCharge = "no";
        this.invoice.invoiceDate = new Date().getDate().toString();
        this.invoice.state = "Gujarat";
        this.invoice.stateCode = 24;
        this.invoice.transportationMode = "road";
        this.invoice.vehicleNumber = "GJ 6 H 3456";
        this.invoice.dateOfSupply = new Date().getDate().toString();
        this.invoice.placeOfSupply = "Anand";
        this.invoice.customerName = "Xyx company";
        this.invoice.customerAddress = "Anand";
        this.invoice.consigneeName = "Xyx company";
        this.invoice.consigneeAddress = "anand";
        this.invoice.hsnCode = 1234567;

        this.item = new Item();
        this.items = [];
        this.editItem = "none";
    }

    ngOnInit() {
        this.getInvoiceId();
    }

    getInvoiceId = () => {
        var args = [{
            queryKey: "getLastInvoiceNumberQuery",
            receiverKey: "get-last-invoice-id-reply",
        }];

        this._electronService.ipcRenderer.on(args[0].receiverKey, (event, args) => {
            if (args != null) {
                this.invoice.id = args[0];
                console.log(args[0])
            }
        });

        this._electronService.ipcRenderer.send("db-operation", args);

    }

    addItem = (item: Item) => {
        var isExisting = this.items.find(x => x.name == item.name);
        if (!isExisting) {
            this.items.push(item);
            this.item = new Item();
        }
    }

    editItems() {
        this.editItem = "block";
        this.editItemText = "none";
    }

    saveEditedValues() {
        this.editItem = "none";
        this.editItemText = "block";
    }

    removeItem(item: Item) {
        var index = this.items.findIndex(x => x.name == item.name);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    printPreview() {
        window.open("/printpriview");
    }

    saveInvoice(invoice: Invoice) {
        var args = [{
            queryKey: "addNewInvoiceQuery",
            receiverKey: "insert-invoice-reply",
            param: []
        }];

        var temp = {};
        temp = invoice;
        for (var prop in temp) {
            args[0].param.push(temp[prop]);
        }

        this._utils.showBusyIndicator();

        this._electronService.ipcRenderer.on(args[0].receiverKey, (event, args) => {
            this.invoice.id = args[0];
            this._utils.hideBusyIndicator();
        });
        this._electronService.ipcRenderer.send("db-operation", args);
    }
}