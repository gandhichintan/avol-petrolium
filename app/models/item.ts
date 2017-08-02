
export class Item {
    id: number;
    name: string;
    packageType: number;
    quantity: number;
    price: number;
    amount: number;
    discount: number;
    amountAfterDiscount: number;
    cgst: number;
    sgst: number;
    total: number;

    constructor(){

    }

    insert = (item: Item) => {
        var query = `INSERT INTO Item
                    (
                       name,
                       packageType,
                       quantity,
                       price,
                       amount,
                       discount,
                       amountAferDiscount,
                       cgst,
                       sgst,
                       total 
                    )
                    VALUES
                    (?,?,?,?,?,?,?,?,?,?)`;
        // new db.DataContext().executeQuery(query, [item.name, item.packageType, item.quantity,
        // item.price, item.amount, item.discount,
        // item.amountAfterDiscount, item.cgst, item.sgst, item.total]);
    }
}