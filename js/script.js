const mobileMenu = document.getElementById("mobile-menu");
const cart = document.getElementById("cart");
const header = document.querySelector("header");
const receipt = document.getElementById("receipt");
const burgers = document.getElementById("burgers");
const sides = document.getElementById("sides");
const shakes = document.getElementById("shakes");
const addToCartBtn = document.querySelectorAll(".addtocart");
const totals = document.getElementById("totals");
const subTotal = document.getElementById("subTotal");
const tax = document.getElementById("tax");
const total = document.getElementById("total");
const empty = document.getElementById("empty");
const payNowBtn = document.getElementById("payNowBtn");
const payment = document.getElementById("payment");
const paymentTotal = document.getElementById("paymentTotal");
const cash = document.getElementById("cash");
const card = document.getElementById("card");
const cashAmount = document.getElementById("cashAmount");
const lowCash = document.getElementById("lowCash");
const displayCartItems = document.getElementById('displayCartItems');
const rItems = document.getElementById('rItems');
const rTax = document.getElementById('rTax');
const rTotal = document.getElementById('rTotal');
const paidWith = document.getElementById('paidWith');
const change = document.getElementById('change');
let clicked;

window.onload = function() {
    sides.classList.add("hide");
    shakes.classList.add("hide");
    cart.classList.add("hide");
    mobileMenu.className = "hide";
    empty.classList.remove("hide");
};

class CartItem {
    constructor(itemID, name, category, description, price, img) {
      this.itemID = itemID;
      this.name = `<h4>${name}</h4>`;
      this.category = category;
      this.description = description;
      this.price = parseFloat(price);
      this.img = `<img src="${img}" />`;
    }
}

let cartArray = []

function toggleMenu(e) {
    mobileMenu.classList.toggle("hide");
}
function showCart(e) {
    cart.classList.remove("hide");
    burgers.classList.add("hide");
    sides.classList.add("hide");
    shakes.classList.add("hide");
    mobileMenu.classList.add("hide");
    payment.classList.add("hide");
    receipt.classList.add("hide");
}
function showBurgers(e) {
    burgers.classList.remove("hide");
    sides.classList.add("hide");
    shakes.classList.add("hide");
    mobileMenu.classList.add("hide");
    cart.classList.add("hide");
    receipt.classList.add("hide");
}
function showSides(e) {
    sides.classList.remove("hide");
    burgers.classList.add("hide");
    shakes.classList.add("hide");
    mobileMenu.classList.add("hide");
    cart.classList.add("hide");
    receipt.classList.add("hide");
}
function showShakes(e) {
    shakes.classList.remove("hide");
    sides.classList.add("hide");
    burgers.classList.add("hide");
    mobileMenu.classList.add("hide");
    cart.classList.add("hide");
    receipt.classList.add("hide");
}
function payNow(e) {
    payment.classList.remove("hide");
    cart.classList.add("hide");
    paymentTotal.innerHTML = total.innerHTML;
}
function addMoreItems() {
    burgers.classList.remove("hide");
    payment.classList.add("hide");
    cart.classList.add("hide");
}
function payCash() {
    clicked = cash;
    cash.classList.remove("hide");
    card.classList.add("hide");
}
function payCard() {
    clicked = card;
    card.classList.remove("hide");
    cash.classList.add("hide");
}

// add to cart
addToCartBtn.forEach((button) => {
    button.addEventListener("click", function(event) {

        button.classList.add("added");
        button.classList.remove("red");
        button.innerHTML = "Added!";
        setTimeout(function() {
            button.classList.remove("added");
            button.classList.add("red");
            button.innerHTML = "Add To Cart";
        }, 1000);
        let name = event.target.parentElement.children[0].textContent;
        let img = event.target.parentElement.children[1].src;
        let category = event.target.parentElement.children[2].textContent;
        let description = event.target.parentElement.children[3].textContent;
        let price = event.target.parentElement.children[4].textContent;
        let index = cartArray.length;
        let itemID = parseInt(button.parentNode.id);

        const newCartItem = new CartItem(itemID, name, category, description, price, img);
        cartArray.push(newCartItem);

        cartItemContainer = document.createElement('div');
        cartItemContainer.setAttribute("id", `${itemID}`);
        cartItemContainer.setAttribute("class", "item");
        cartItemContainer.innerHTML = cartArray[index].img + cartArray[index].name + `<h3>$${cartArray[index].price.toFixed(2)}</h3>` + `<div class="trash"><i onclick='removeFromCart(${itemID})' class="fas fa-trash-alt"></i></div>`;
        displayCartItems.appendChild(cartItemContainer)

        if (cartArray.length > 0) {
            totals.classList.remove("hide");
            empty.classList.add("hide");
            payNowBtn.classList.remove("hide");
        }
        calculateTotals();
    })
})

// Remove from cart
function removeFromCart(itemID) {
    
    let nodeToRemove = document.getElementById(`${itemID}`);
    nodeToRemove.remove();
    indexOfNodeToRemove = cartArray.findIndex(i => i.itemID === itemID)
    cartArray.splice(indexOfNodeToRemove, 1);
   
    if (cartArray.length <= 0) {
        empty.classList.remove("hide");
        totals.classList.add("hide");
        payment.classList.add("hide");
    }
    calculateTotals();
}

function calculateTotals() {
    let subTotalNumb = cartArray.reduce(function(prev, cur) {
        return prev + cur.price;
    }, 0);

    subTotal.innerHTML = `<hr><h3>Subtotal: $${subTotalNumb.toFixed(2)}</h3>`;

    taxNumb = subTotalNumb * 0.06;
    tax.innerHTML = `<h3>Tax: $${taxNumb.toFixed(2)}</h3>`;
    
    totalNumb = subTotalNumb + taxNumb;
    total.innerHTML = `<h3>Total: $${totalNumb.toFixed(2)}</h3>`;
}

function getReceipt(e) {
    let usersCash = cashAmount.value;
    
    if (clicked === cash && usersCash < totalNumb) {
        lowCash.classList.remove("hide");
    } else if (clicked === card || usersCash >= totalNumb) {
        header.classList.add("hide");
        receipt.classList.remove("hide");
        payment.classList.add("hide");
        lowCash.classList.add("hide");

        cartArray.forEach(function(i) {
            nameContainer = document.createElement('div');
            priceContainer = document.createElement('div');
    
            nameContainer.innerHTML = i.name;
            priceContainer.innerHTML = `<h4>$${i.price}</h4>`;
    
            itemContainer = document.createElement('div');
            itemContainer.appendChild(nameContainer);
            itemContainer.appendChild(priceContainer);
                
            rItems.appendChild(itemContainer);
        })    

        if (clicked === cash) {
            usersChange = cashAmount.value - totalNumb;
            change.innerHTML = `<h4>Change Due: $${usersChange.toFixed(2)}</h4>`
        }
    }

    rTax.innerHTML = `<h4>Tax: $${taxNumb.toFixed(2)}</h4>`;
    rTotal.innerHTML = `<h4>Total: $${totalNumb.toFixed(2)}</h4>`

    if (clicked === cash) {
        paidWith.innerHTML = `<h4>Paid with: Cash</h4>`;
    } else {
        paidWith.innerHTML = `<h4>Paid with: Card</h4>`;
    }
}
