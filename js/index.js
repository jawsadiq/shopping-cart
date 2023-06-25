document.addEventListener("DOMContentLoaded", function() {
  displayCart();
});

var cart = [];

function addToCart(index) {
  var productElements = document.getElementsByClassName("product");
  var productElement = productElements[index];
  var productNameElement = productElement.querySelector(".product-name");
  var productPriceElement = productElement.querySelector(".card-text");
  var productName = productNameElement.textContent;
  var productPriceText = productPriceElement.textContent;
  var productPrice = parseFloat(productPriceText.replace("$", ""));
  
  var product = { name: productName, price: productPrice };
  cart.push(product);
  displayCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}
function clearCart() {
  cart = []; // Clear the cart array
  displayCart(); // Update the displayed cart
}
function checkout() {
  var totalPrice = calculateTotalPrice();
  alert("Total Price: $" + totalPrice.toFixed(2));
}

function calculateTotalPrice() {
  var totalPrice = 0;
  for (var i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price;
  }
  return totalPrice;
}

function displayCart() {
  var cartContainer = document.querySelector(".cart-items");
  var totalPriceContainer = document.querySelector(".total-price");
  cartContainer.innerHTML = "";

  var totalPrice = 0;

  for (var i = 0; i < cart.length; i++) {
    var cartItem = cart[i];

    var productName = cartItem.name;
    var productPrice = cartItem.price;

    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = (function (index) {
      return function () {
        removeFromCart(index);
      };
    })(i);

    var cartItemElement = document.createElement("div");
    cartItemElement.className = "cart-item";
    cartItemElement.innerHTML = "<span class='item-name'>" + productName +  "</span>" +
                                "<span class='item-price'>$" + productPrice.toFixed(2) + "</span>";
    cartItemElement.appendChild(removeButton);
    cartContainer.appendChild(cartItemElement);

    totalPrice += productPrice;
  }

  totalPriceContainer.textContent = "Total Price: $" + totalPrice.toFixed(2);
}
