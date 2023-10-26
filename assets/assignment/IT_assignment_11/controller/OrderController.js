import {OrderModel} from "../model/OrderModel.js";
import {order_db} from "../db/db.js";
import {customer_db} from "../db/db.js";
import {item_db} from "../db/db.js";

var row_index = null;

const clear = () => {
    $("#description-order").val("");
    $("#price-order").val("");
    $("#orderQty").val("");
    $("#total").val("");
}

const loadOrderData = () => {
    $('#order-table-body').empty();
    order_db.map((item, index) => {
        let record = `<tr><td class="itemCode">${item.itemCode}</td><td class="description">${item.description}</td><td class="price">${item.price}</td><td class="orderQty">${item.orderQty}
        </td><td class="total">${item.total}</td></tr>`;
        $("#order-table-body").append(record);
    });
};

// submit
$("#add-button>button[type='button']").eq(0).on("click", () => {
    console.log(customer_db.length)
    let itemCode = $("#itemCode").val();
    let description = $("#description-order").val();
    let price = $("#price-order").val();
    let orderQty = $("#orderQty").val();
    let total = orderQty*price;

    let order_obj = new OrderModel(itemCode, description, price, orderQty, total);

    order_db.push(order_obj);
    clear();
    loadOrderData();
});
$("#selectCusID").eq(0).on("click", () => {
    $("#selectCusID").empty();

//         { value: i, text: customer_db.map((result)=>console.log(result.customer_id))},

    var selectElement = $("#selectCusID");
    var option = $("<option>")
        .text("customer id")
    selectElement.append(option);
    for (var i = 0; i < customer_db.length; i++) {
        var option = $("<option>")
            .val(customer_db[i].customer_id)
            .text(customer_db[i].customer_id);
        selectElement.append(option);
    }
});
$("#selectCusID").on("change", function() {
    var selectedValue = $(this).val();
    let index = customer_db.findIndex(item => item.customer_id === selectedValue);
    $("#name-order").val(customer_db[index].name)
});
$("#itemCode").on("click", () => {
    $("#itemCode").empty();

//         { value: i, text: customer_db.map((result)=>console.log(result.customer_id))},

    var selectElement = $("#itemCode");
    var option = $("<option>")
        .text("Item Code")
    selectElement.append(option);
    for (var i = 0; i < item_db.length; i++) {
        var option = $("<option>")
            .val(item_db[i].item_code)
            .text(item_db[i].item_code);
        selectElement.append(option);
    }
});
$("#itemCode").on("change", function() {
    var selectedValue = $(this).val();
    let index = item_db.findIndex(item => item.item_code === selectedValue);
    $("#description-order").val(item_db[index].description)
    $("#price-order").val(item_db[index].price)
    $("#qty-order").val(item_db[index].item_qty)
});
