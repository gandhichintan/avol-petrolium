import { ElectronService } from "ngx-electron";
export class Purchase {
    id: number;
    item: string;
    type: number;
    quantity: number;

    constructor() {

    }

    insert = (item: Purchase) => {
        var query = `INSERT INTO Invoice
                    (
                        item,
                        type,
                        quantity
                    )
                    VALUES
                    (?,?,?,?)`;

        //new db.DataContext().executeQuery(query, [item.item, item.type, item.quantity]);
    }
}