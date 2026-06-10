import {
    getProducts
} from "./api.js";

import {
    Product
} from "./models.js";

const container =
document.getElementById("products");

async function renderCatalog() {

    const products =
    await getProducts();

    container.innerHTML = "";

    products.forEach(item => {

        const product =
        new Product(
            item.id,
            item.title,
            item.price,
            item.description,
            item.image,
            item.category
        );

        container.innerHTML +=
        product.renderCard();

    });
}

document.addEventListener(
    "DOMContentLoaded",
    renderCatalog
);