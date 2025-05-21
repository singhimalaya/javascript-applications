export function productsListFetch(rootEl, config = {}) {
  const state = {
    loading: false,
  };

  const dom = {
    $rootEl: rootEl,
    $productsContainerEl: document.createElement("div"),
    $loaderEl: document.createElement("div"),
  };

  function createProductEl(product) {
    const tpl = config.productTpl.content.cloneNode(true);
    tpl
      .querySelector(".app-1__product-img-container img")
      .setAttribute("src", product.thumbnail);
    tpl.querySelector(".app-1__product-title").textContent = product.title;
    tpl.querySelector(
      ".app-1__product-price"
    ).textContent = `$${product.price}`;
    tpl.querySelector(".app-1__product-description").textContent =
      product.description;

    return tpl;
  }

  function renderProducts(products) {
    const fragment = new DocumentFragment();

    for (const product of products) {
      fragment.appendChild(createProductEl(product));
    }

    dom.$productsContainerEl.appendChild(fragment);
  }

  function showLoader(loading) {
    if (loading) {
      dom.$rootEl.classList.add("show-loader");
    } else {
      dom.$rootEl.classList.remove("show-loader");
    }
  }

  function fetchProducts() {
    showLoader(true);
    const req = new Request("https://dummyjson.com/products");

    fetch(req)
      .then((res) => res.json())
      .then(({ products }) => {
        showLoader(false);
        renderProducts(products);
      })
      .catch((err) => {
        showLoader(false);
        console.error("API ERROR: ", err);
      });
  }

  function init() {
    dom.$productsContainerEl.classList.add("app-1__products-container");
    dom.$rootEl.appendChild(dom.$productsContainerEl);
    dom.$loaderEl.textContent = "loading...";
    dom.$loaderEl.classList.add("app--loader");
    dom.$rootEl.appendChild(dom.$loaderEl);

    fetchProducts();
  }

  init();
}
