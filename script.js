const menu = {
  "sunrise-latte": { name: "Sunrise Salted Latte", price: 6.75 },
  "ocean-cold-brew": { name: "Ocean Cold Brew", price: 5.95 },
  "palm-mocha": { name: "Palm Mocha", price: 6.4 },
  "beachside-matcha": { name: "Beachside Matcha", price: 6.1 },
};

const sizePricing = {
  small: 0,
  medium: 0.6,
  large: 1.1,
};

const cart = [];

const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const stickyTotal = document.getElementById("sticky-total");
const orderForm = document.getElementById("order-form");
const drinkSelect = document.getElementById("drink-select");
const sizeSelect = document.getElementById("size-select");
const milkSelect = document.getElementById("milk-select");
const pickupSelect = document.getElementById("pickup-select");
const notesInput = document.getElementById("notes");
const clearCartButton = document.getElementById("clear-cart");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function buildCartItem(drinkId, size = "medium") {
  const drink = menu[drinkId];
  const price = drink.price + sizePricing[size];

  return {
    name: drink.name,
    size,
    milk: milkSelect.value,
    pickup: pickupSelect.value,
    notes: notesInput.value.trim(),
    price,
  };
}

function renderCart() {
  if (!cart.length) {
    cartList.innerHTML =
      '<li class="empty-state">No drinks yet. Add your first order above.</li>';
    cartTotal.textContent = "$0.00";
    stickyTotal.textContent = "$0.00";
    return;
  }

  cartList.innerHTML = cart
    .map(
      (item) => `
        <li>
          <div>
            <strong>${item.name}</strong>
            <small>${item.size}, ${item.milk}, ${item.pickup}</small>
            ${item.notes ? `<small>Notes: ${item.notes}</small>` : ""}
          </div>
          <strong>${formatCurrency(item.price)}</strong>
        </li>
      `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const formatted = formatCurrency(total);
  cartTotal.textContent = formatted;
  stickyTotal.textContent = formatted;
}

function addToCart(drinkId, size = "medium") {
  cart.push(buildCartItem(drinkId, size));
  renderCart();
}

document.querySelectorAll("[data-id]").forEach((button) => {
  button.addEventListener("click", () => {
    addToCart(button.dataset.id);
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addToCart(drinkSelect.value, sizeSelect.value);
  orderForm.reset();
  drinkSelect.value = "sunrise-latte";
  sizeSelect.value = "medium";
});

clearCartButton.addEventListener("click", () => {
  cart.length = 0;
  renderCart();
});

renderCart();
