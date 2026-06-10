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

let products = [];
let currentProducts = [];

const productGrid = document.getElementById("productGrid");

async function loadProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    const data = await response.json();

    products = data.map(
      (product) =>
        new Product(
          product.id,
          product.title,
          product.price,
          product.description,
          product.image,
          product.category,
        ),
    );

    currentProducts = [...products];

    renderProducts(currentProducts);

    loadCategories();
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);

    if (productGrid) {
      productGrid.innerHTML = `<h2>
                Не удалось загрузить товары
            </h2>`;
    }
  }
}

function renderProducts(items) {
  if (!productGrid) return;

  productGrid.innerHTML = "";

  items.forEach((product) => {
    productGrid.innerHTML += `

        <div class="product-card">

            <img
                src="${product.image}"
                alt="${product.title}"
            >

            <h3>
                ${product.title}
            </h3>

            <p>

                ${Math.round(product.price * 500)} ₸

            </p>

            <button
                onclick="openProduct(${product.id})">

                Подробнее

            </button>

        </div>

        `;
  });
}

function openProduct(id) {
  location.href = `html/product.html?id=${id}`;
}

function searchProducts() {
  const searchText = document.getElementById("search").value.toLowerCase();

  const filtered = currentProducts.filter((product) =>
    product.title.toLowerCase().includes(searchText),
  );

  renderProducts(filtered);
}

function sortProducts(type) {
  const sorted = [...currentProducts];

  switch (type) {
    case "asc":
      sorted.sort((a, b) => a.price - b.price);

      break;

    case "desc":
      sorted.sort((a, b) => b.price - a.price);

      break;

    case "name":
      sorted.sort((a, b) => a.title.localeCompare(b.title));

      break;
  }

  currentProducts = [...sorted];

  renderProducts(currentProducts);
}

function loadCategories() {
  const select = document.getElementById("category");

  if (!select) return;

  const categories = [...new Set(products.map((product) => product.category))];

  categories.forEach((category) => {
    const option = document.createElement("option");

    option.value = category;

    option.textContent = translateCategory(category);

    select.append(option);
  });
}

function translateCategory(category) {
  switch (category) {
    case "men's clothing":
      return "Мужская одежда";

    case "women's clothing":
      return "Женская одежда";

    case "electronics":
      return "Аксессуары";

    case "jewelery":
      return "Украшения";

    default:
      return category;
  }
}

function filterCategory() {
  const category = document.getElementById("category").value;

  if (category === "all") {
    currentProducts = [...products];
  } else {
    currentProducts = products.filter(
      (product) => product.category === category,
    );
  }

  renderProducts(currentProducts);
}

document.addEventListener("DOMContentLoaded", loadProducts);
