class CartItem {
  constructor(product, quantity = 1) {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.image = product.image;
    this.quantity = quantity;
  }
}

class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
  }

  save() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  add(product) {
    const existing = this.items.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      this.items.push(new CartItem(product));
    }

    this.save();
    this.updateCounter();
  }

  remove(id) {
    this.items = this.items.filter((item) => item.id !== id);

    this.save();
    this.updateCounter();
  }

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateCounter() {
    const counter = document.getElementById("cartCounter");

    if (counter) {
      counter.textContent = this.getCount();
    }
  }
}

const cart = new Cart();

document.addEventListener("DOMContentLoaded", () => {
  cart.updateCounter();
});

function renderCart() {
  const container = document.getElementById("cartItems");

  container.innerHTML = "";

  if (cart.items.length === 0) {
    container.innerHTML = `

            <div class="empty-cart">

                <h2>Корзина пуста</h2>

                <a href="../index.html">
                    Перейти в каталог
                </a>

            </div>

        `;

    document.getElementById("totalPrice").textContent = "0 ₸";

    return;
  }

  cart.items.forEach((item) => {
    container.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}">

                <div>

                    <h3>${item.title}</h3>

                    <p>Количество: ${item.quantity}</p>

                    <p>${Math.round(item.price * 500)} ₸</p>

                </div>

                <button onclick="removeItem(${item.id})">
                    Удалить
                </button>

            </div>

        `;
  });

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * 500 * item.quantity,
    0,
  );

  document.getElementById("totalPrice").textContent = total + " ₸";
}

function removeItem(id) {
  cart.remove(id);

  renderCart();
}

function checkout() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    date: new Date().toLocaleString(),

    products: cart.items,

    total: cart.getTotal(),
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Заказ оформлен");

  localStorage.removeItem("cart");

  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
