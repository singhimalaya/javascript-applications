import { productsListFetch } from "./apps/products-list.mjs";

// App 1: Example of js fetch api
productsListFetch(document.getElementById("app-products-list"), {
  productTpl: document.getElementById("app-1__product-tpl"),
});
