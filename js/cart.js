import elements from "./helpers.js";
import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

// Localstorage'dan cart verisini al
let cart = getFromLocalStorage();

// ! Sepete ekleme yapan fonksiyon
const addToCart = (e, products) => {
  // Tıklanılan elemanın id'sine eriş
  const productId = parseInt(e.target.dataset.id);

  // Product içerisinden id'si bilinen elemana eriş
  const product = products.find((product) => product.id === productId);

  // Eğer ürün varsa cart dizisini kontrol
  if (product) {
    // Ürün sepette varmı bunu kontrol et ve varsa bunu exitingItem a aktar
    const exitingItem = cart.find((item) => item.id === productId);

    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      // Erişilen elemanın verileriyle bir cart elemanı objesi oluştur
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      // Cart dizisine cartItem objesini ekle
      cart.push(cartItem);
    }
    // Cart dizisini localstorage a ekle
    saveToLocalStorage(cart);

    // Sepete ekle butonun içeriğini güncelle
    e.target.textContent = "Added";

    // 2s sonra elemanın içeriğini tekrardan eski hale çevir
    setTimeout(() => {
      e.target.textContent = "Add to cart";
    }, 2000);

    // Sepet ikonunu güncelle
    updateCartIcon(cart);
  }
};

// ! Sepetten ürün kaldıracak fonksiyon
const removeFromCart = (e) => {
  // Tıklanılan elemanın id'sine eriş
  const productId = parseInt(e.target.dataset.id);

  // Id'si bilinen elemanı sepetten kaldır
  cart = cart.filter((item) => item.id != productId);

  // Localstorage'i güncelle
  saveToLocalStorage(cart);

  // Arayüzü tekrardan render et
  renderCartItems();

  // Sepet toplamını render et
  displayCartTotal();

  // Sepet ikonunu güncelle
  updateCartIcon(cart);
};
// Sepetteki ürün miktarını güncelleyen fonksiyon

const onQuantityChange = (e) => {
  const productId = +e.target.dataset.id;
  const newQuantity = +e.target.value;

  // Sepeteki elemanın değeri 0'dan büyükse
  if (newQuantity > 0) {
    // Sepet içerisinde miktarı değişen elemanı bul
    const cartItem = cart.find((item) => item.id === productId);

    // Bulunan elemanın miktarını güncelle
    cartItem.quantity = newQuantity;

    // localstorag'ı güncelle
    saveToLocalStorage(cart);

    // toplam fiyatı güncelle
    displayCartTotal();

    // Sepet ikonunu güncelle
    updateCartIcon(cart);
  }
};

// ! Sepetteki ürünleri render edecek fonksiyon

const renderCartItems = () => {
  elements.cartItemsList.innerHTML = cart
    .map(
      (item) => `  <div class="cart-item">
              <img
                src="${item.image}"
                alt=""
              />

              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input type="number" min="1" class='cart-item-quantity' data-id='${item.id}'  value="${item.quantity}" />
              </div>

              <h2 class="cart-item-price">$ ${item.price}</h2>

              <button class="remove-from-cart" data-id='${item.id}'>Remove</button>
            </div>`
    )
    .join("");

  // remove-from-cart classına sahip olan butonlara eriş
  const removeButtons = document.querySelectorAll(".remove-from-cart");

  // removeButtons içerisindeki herbir butona ayrı ayrı eriş

  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];

    // Bu butonlara bir tıklanma gerçekleştiğinde bir fonksiyon tetikle
    removeButton.addEventListener("click", removeFromCart);
  }

  // cart-item-quantity classına sahip tüm elemanlara eriş
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");

  // quantityInputs içerisindeki herbir inputa ayrı ayrı eriş

  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];

    // quantityInput lara birer olay izleyicisi ekle
    quantityInput.addEventListener("change", onQuantityChange);
  }
};

// Sepetteki toplam ürün mikarını render eden fonksiyon
const displayCartTotal = () => {
  // calculateCartTotal ile sepetteki toplam fiyatı hesapla
  const total = calculateCartTotal(cart);
  // Toplam değeri ekranda render et
  elements.cartTotal.textContent = `Total: $${total.toFixed(2)}`;
};

export { addToCart, renderCartItems, displayCartTotal };
