import { addToCart, displayCartTotal, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";
import { getFromLocalStorage, updateCartIcon } from "./utils.js";

const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector(".navbar");

// MenuIcon'a tıklanınca menu'ye bir class ekle-çıkar
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});

document.addEventListener("DOMContentLoaded", async () => {
  // Localstorage'dan cart verisini al

  let cart = getFromLocalStorage();

  if (window.location.pathname.includes("/cart.html")) {
    // Eğer sepet sayfasındaysak sepete eklenen ürünleri render et
    renderCartItems();
    // Sepet toplamını render eden fonksiyonu çalıştır
    displayCartTotal();
  } else {
    // Eğer anasayfadaysak api'a istek at ve verileri al
    const products = await fetchProducts();
    // Api'dan gelen verileri ekrana render et
    renderProducts(products, (e) => {
      addToCart(e, products);
    });
  }

  // Sepet ikonunu güncelle
  updateCartIcon(cart);
});
