const Products = [
    { id: 1, name: "Casual Shirt", price: 650 },
    { id: 2, name: "Formal Shirt", price: 1200 },
    { id: 3, name: "Denim Shirt", price: 1500 },
];

let total = 0;
let cart_container = document.querySelector(".container_right");
let table_body = document.getElementById("table_body");
let plus = document.querySelector(".plus");
let emptyCart = document.querySelector(".table-container p");
let editing = document.getElementById("editing");
editing.classList = "editing";


// Add products in the cart


let product_list = document.querySelectorAll(".container-left .product");
product_list.forEach((val) => {
    let plus = val.querySelector(".plus");
    plus.addEventListener("click", () => {
        let items = val.querySelector("#items");
        if (items.innerText < 10) items.innerText = parseInt(items.innerText) + 1;
        let product_id = val.querySelector(".product_id").innerText;

        Products.forEach((idx) => {
            if (items.innerText == 1 && parseInt(product_id) == idx.id) {
                addToCart(idx.id, idx.name, idx.price, items.innerText);
                totalSum(idx.price, items.innerText);
            } else if (parseInt(product_id) == idx.id) {
                let td2 = document.querySelector(`#data${idx.id}`);
                td2.innerText = `${items.innerText} x ${idx.price}`;
                totalSum(idx.price, items.innerText);
            }

        });
        if (table_body.children.length > 0) {
            emptyCart.innerText = "";
        }

    });

    let minus = val.querySelector(".minus");
    minus.addEventListener("click", () => {
        let items = val.querySelector("#items");
        if (items.innerText >= 1) items.innerText = parseInt(items.innerText) - 1;
        let product_id = val.querySelector(".product_id").innerText;

        Products.forEach((idx) => {
            if (items.innerText == 0 && parseInt(product_id) == idx.id) {
                removeFromCart(idx.id, idx.name, idx.price, items.innerText);
                subtract(idx.price);
                cartItems--;
                editing.innerText = `${cartItems}`;

            } else if (parseInt(product_id) == idx.id) {
                let td2 = document.querySelector(`#data${idx.id}`);
                td2.innerText = `${items.innerText} x ${idx.price}`;
                subtract(idx.price);
            }

        });

        if (table_body.children.length == 0) {
            emptyCart.innerText = "No Product added to the cart";
        }
    });
});
let i = 1;

function addToCart(id, product_name, product_price, no_of_items) {
    cartItems++;
    let row = document.createElement("tr");
    row.setAttribute("id", `row1-${id}`);
    let table_data = document.createElement("td");
    let table_data2 = document.createElement("td");
    table_data.innerText = `${product_name}`;
    table_data2.innerText = `${no_of_items} x ${product_price}`;
    table_data2.setAttribute("id", `data${id}`);
    console.log("row=", row);
    row.appendChild(table_data);
    console.log("row=", row);
    table_body.appendChild(row);
    row.appendChild(table_data2);
    console.log("row=", row);
    row.style.borderBottom = "2px dashed black";
    table_body.appendChild(row);
    editing.innerText = `${cartItems}`;
}

function removeFromCart(id, product_name, product_price, no_of_items) {
    let deleteRow = document.querySelector(`#row1-${id}`);
    table_body.removeChild(deleteRow);
}
let cartItems = 0;
let totalPrice = document.querySelector("#totalPrice");

function totalSum(price, totalItem) {
    if (totalItem < 10) {
        total += price;
        totalPrice.innerText = `${total}`;
    }
}

function subtract(price) {
    total -= price;
    totalPrice.innerText = `${total}`;
}


let cartItem = document.getElementById("cartItem")
let cart = document.querySelector(".cart");
cart.addEventListener("click", () => {
    cartItem.style.display = "block"
})
let close = document.querySelector(".close");
close.addEventListener("click", () => {
    cartItem.style.display = "none"
})