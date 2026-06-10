class Product {
  constructor(id, title, price, description, image, category) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
    this.category = category;
  }
}

let currentProduct = null;

// =========================
// загрузка товара
// =========================

async function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();

    if (!data || !data.id) {
      document.getElementById("productDetails").innerHTML = `
                <div class="not-found">
                    <h1>Товар не найден</h1>
                    <a href="../index.html">Вернуться в каталог</a>
                </div>
            `;

      return;
    }

    currentProduct = new Product(
      data.id,
      data.title,
      data.price,
      data.description,
      data.image,
      data.category,
    );

    renderProduct();
  } catch (err) {
    console.error(err);
  }
}

// =========================
// рендер товара
// =========================

function renderProduct() {
  const container = document.getElementById("productDetails");

  container.innerHTML = `

        <div class="product-left">

            <img src="${currentProduct.image}" alt="">

        </div>

        <div class="product-right">

            <h1>${currentProduct.title}</h1>

            <div class="detail-price">
                ${Math.round(currentProduct.price * 500)} ₸
            </div>

            <p>${currentProduct.description}</p>

            <button class="product-btn" onclick="addToCart()">
                Добавить в корзину
            </button>

            <div class="actions">

                <a href="../index.html">В каталог</a>
                <a href="cart.html">В корзину</a>

            </div>

        </div>

    `;
}

// =========================
// корзина
// =========================

function addToCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === currentProduct.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: currentProduct.id,
      title: currentProduct.title,
      price: currentProduct.price,
      image: currentProduct.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Добавлено в корзину");
}

// =========================

document.addEventListener("DOMContentLoaded", loadProduct);
