import elements from "./helpers.js";

// ! Db.json'a istek atarak verileri alan fonksiyon
const fetchProducts = async () => {
  try {
    const res = await fetch("db.json");

    const data = await res.json();
    // Eğer bir sıkıntı varsa hata fırlat
    if (!res.ok) {
      throw new Error("İşlem sırasında bir hata oluştu");
    }
    // Bir hata yoksa data'yı dönder
    return data;
  } catch (err) {
    console.log(`Hataaa: ${err}`);
    return [];
  }
};

// Ürünleri render eden fonksiyon

const renderProducts = (products, addToCartCallBack) => {
  // Dışarıdan parametre olarak alınan products değerini dönerek bir html oluşturur bu html ise productList içerisine aktarır
  elements.productList.innerHTML = products
    .map(
      (product) => `
     <div class="product">
          <img
            src="${product.image}"
            class="product-image"
            alt="product-image"
          />
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price}</p>
            <a class="add-to-cart" data-id='${product.id}' >Add to cart</a>
          </div>
        </div>
  `
    )
    .join("");
  // Elde edilen veri bir dizi olduğundan burada dizi elemanlarını nasıl ayırması gerektiğini belirledik

  // Classı add-to-cart olan elemanları seç
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  //  querySelectorAll metodu erişilen elemanları bir dizi şeklinde döndürdüğünden bunun içerisinde her bir elemana erişmemiz gerekir
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];

    // Elde edilen tüm buttonlara bir olay izleyicisi ekle
    addToCartButton.addEventListener("click", addToCartCallBack);
  }
};

export { fetchProducts, renderProducts };
