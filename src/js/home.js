/* =========================
   ELEMENTOS
========================= */

const loadingScreen = document.getElementById("loadingScreen");
const categoriesGrid = document.getElementById("categoriesGrid");
const productsSection = document.getElementById("productsSection");
const categoryTitle = document.getElementById("categoryTitle");
const searchBox = document.getElementById("searchBox");
const searchInput = searchBox.querySelector("input");
const pageTitle = document.getElementById("pageTitle");
const pageDescription = document.getElementById("pageDescription");
const toastContainer = document.getElementById("toastContainer");
let cartCount = null;
const productsGrid = document.getElementById("productsGrid");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const themeToggle = document.getElementById("themeToggle");
const logoutButton = document.getElementById("logoutButton");
const cartContent = document.getElementById("cartContent");
const actionButtonArea = document.getElementById("actionButtonArea");
const userType = localStorage.getItem("userType");
const editModal = document.getElementById("editModal");
const closeEditModal = document.getElementById("closeEditModal");
const editName = document.getElementById("editName");
const editSub = document.getElementById("editSub");
const editPrice = document.getElementById("editPrice");
const editImage = document.getElementById("editImage");
const saveEditBtn = document.getElementById("saveEditBtn");

let currentEditingProduct = null;

let currentCategory = "";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart = cart.filter(
  (item) => item && item.name && item.price && item.quantity > 0,
);
saveCart();

/* =========================
   PRODUTOS
========================= */

const menuProducts = {
  lanches: [
    {
      id: 1,
      name: "X-Burger",
      sub: "Hambúrguer",
      price: 12,
      image: "img/produtos/xburger.png",
    },
    {
      id: 2,
      name: "X-Salada",
      sub: "Hambúrguer",
      price: 14,
      image: "img/produtos/xsalada.png",
    },
    {
      id: 3,
      name: "Misto Quente",
      sub: "Sanduíche",
      price: 8,
      image: "img/produtos/misto.png",
    },
    {
      id: 4,
      name: "Hot Dog",
      sub: "Lanche rápido",
      price: 10,
      image: "img/produtos/hotdog.png",
    },
  ],

  salgados: [
    {
      id: 5,
      name: "Coxinha",
      sub: "Salgadinho",
      price: 6,
      image: "img/produtos/coxinha.png",
    },
    {
      id: 6,
      name: "Esfiha",
      sub: "Salgado assado",
      price: 7,
      image: "img/produtos/esfiha.png",
    },
    {
      id: 7,
      name: "Pastel",
      sub: "Salgado frito",
      price: 8,
      image: "img/produtos/pastel.png",
    },
    {
      id: 8,
      name: "Pão de Queijo",
      sub: "Salgado assado",
      price: 5,
      image: "img/produtos/pao-queijo.png",
    },
  ],

  bebidas: [
    {
      id: 9,
      name: "Suco Natural",
      sub: "Bebida gelada",
      price: 7,
      image: "img/produtos/suco.png",
    },
    {
      id: 10,
      name: "Água Mineral",
      sub: "Bebida",
      price: 3,
      image: "img/produtos/agua.png",
    },
    {
      id: 11,
      name: "Refrigerante",
      sub: "Bebida gelada",
      price: 6,
      image: "img/produtos/refrigerante.png",
    },
    {
      id: 12,
      name: "Achocolatado",
      sub: "Bebida láctea",
      price: 5,
      image: "img/produtos/achocolatado.png",
    },
  ],

  doces: [
    {
      id: 13,
      name: "Bolo de Chocolate",
      sub: "Bolo",
      price: 7,
      image: "img/produtos/bolo-chocolate.png",
    },
    {
      id: 14,
      name: "Brigadeiro",
      sub: "Docinho",
      price: 3,
      image: "img/produtos/brigadeiro.png",
    },
    {
      id: 15,
      name: "Bala Sortida",
      sub: "Bala",
      price: 2,
      image: "img/produtos/balas.png",
    },
    {
      id: 16,
      name: "Brownie",
      sub: "Sobremesa",
      price: 8,
      image: "img/produtos/brownie.png",
    },
  ],

  combos: [
    {
      id: 17,
      name: "Combo Lanche",
      sub: "Lanche + Bebida",
      price: 18,
      image: "img/produtos/combo-lanche.png",
    },
    {
      id: 18,
      name: "Combo Salgado",
      sub: "Salgado + Suco",
      price: 12,
      image: "img/produtos/combo-salgado.png",
    },
    {
      id: 19,
      name: "Combo Doce",
      sub: "Doce + Bebida",
      price: 10,
      image: "img/produtos/combo-doce.png",
    },
  ],

  sorvetes: [
    {
      id: 20,
      name: "Sorvete de Chocolate",
      sub: "Sorvete",
      price: 6,
      image: "img/produtos/sorvete-chocolate.png",
    },
    {
      id: 21,
      name: "Picolé de Fruta",
      sub: "Picolé",
      price: 4,
      image: "img/produtos/picole.png",
    },
    {
      id: 22,
      name: "Açaí no Copo",
      sub: "Gelado",
      price: 12,
      image: "img/produtos/acai.png",
    },
  ],
};

/* =========================
   TOAST
========================= */

function showToast(type, title, message) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icon =
    type === "error"
      ? "fa-circle-xmark"
      : type === "warning"
        ? "fa-triangle-exclamation"
        : "fa-circle-check";

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <div>
      <strong>${title}</strong>
      <p>${message}</p>
    </div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* =========================
   CATEGORIAS
========================= */

function openCategory(category) {
  currentCategory = category;

  categoriesGrid.style.display = "none";
  productsSection.style.display = "block";
  searchBox.style.display = "flex";
  searchInput.value = "";

  pageTitle.innerHTML = `
    <i class="fa-solid fa-burger"></i>
    <span>PRODUTOS</span>
    <i class="fa-solid fa-burger"></i>
  `;

  pageDescription.innerHTML = `
    <img src="img/seta.png" class="subtitle-arrow left-arrow" />
    Escolha os produtos da categoria ${category}
    <img src="img/seta.png" class="subtitle-arrow" />
  `;

  categoryTitle.innerText =
    category.charAt(0).toUpperCase() + category.slice(1);

  renderProducts(category);
}

function backHome() {
  currentCategory = "";

  categoriesGrid.style.display = "grid";
  productsSection.style.display = "none";
  searchBox.style.display = "none";
  searchInput.value = "";

  pageTitle.innerHTML = `
    <i class="fa-solid fa-burger"></i>
    <span>CATEGORIAS</span>
    <i class="fa-solid fa-burger"></i>
  `;

  pageDescription.innerHTML = `
    <img src="img/seta.png" class="subtitle-arrow left-arrow" />
    Escolha através das categorias abaixo e faça seu pedido!
    <img src="img/seta.png" class="subtitle-arrow" />
  `;
}

searchBox.style.display = "none";

function renderProducts(category, searchTerm = "") {
  const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];

  let products = menuProducts[category] || [];

  if (adminProducts.length > 0) {
    products = products.map((product) => {
      const savedProduct = adminProducts.find((item) => item.id === product.id);

      return savedProduct || product;
    });

    products = products.filter((product) => {
      return product.active !== false;
    });
  }

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  productsGrid.innerHTML = filteredProducts
    .map((product) => {
      return `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">

        <span class="product-sub">
          ${product.sub}
        </span>

        <h3>${product.name}</h3>

        <p>
          R$ ${product.price.toFixed(2).replace(".", ",")}
        </p>

        ${
          userType === "admin"
            ? `<button onclick="openEditModal(${product.id})">
    Editar
  </button>`
            : `<button onclick="addToCart('${product.name}', ${product.price})">
    Adicionar
  </button>`
        }
      </div>
    `;
    })
    .join("");
}

searchInput.addEventListener("input", (event) => {
  if (currentCategory === "") return;

  renderProducts(currentCategory, event.target.value);
});

if (userType === "admin") {
  actionButtonArea.innerHTML = `
    <button
      class="icon-btn"
      id="adminButton"
    >
      <i class="fa-solid fa-shield-halved"></i>
    </button>
  `;

  cartSidebar.style.display = "none";
  cartOverlay.style.display = "none";

  const adminButton = document.getElementById("adminButton");

  adminButton.addEventListener("click", () => {
    goWithLoading("admin.html", "Carregando . . .");
  });
} else {
  actionButtonArea.innerHTML = `
    <button
      class="icon-btn cart-icon-btn"
      id="cartButton"
    >
      <i class="fa-solid fa-cart-shopping"></i>

      <span
        class="cart-count"
        id="cartCount"
      >
        0
      </span>
    </button>
  `;
}

cartCount = document.getElementById("cartCount");

function openEditModal(productId) {
  const allProducts = Object.values(menuProducts).flat();

  const product = allProducts.find((item) => item.id === productId);

  if (!product) return;

  currentEditingProduct = product;

  editName.value = product.name;
  editSub.value = product.sub;
  editPrice.value = product.price;
  editImage.value = product.image;

  editModal.classList.add("active");
}

closeEditModal.addEventListener("click", () => {
  editModal.classList.remove("active");
});

saveEditBtn.addEventListener("click", () => {
  if (!currentEditingProduct) return;

  currentEditingProduct.name = editName.value;
  currentEditingProduct.sub = editSub.value;
  currentEditingProduct.price = Number(editPrice.value);
  currentEditingProduct.image = editImage.value;

  renderProducts(currentCategory);

  editModal.classList.remove("active");

  showToast(
    "success",
    "Produto editado!",
    "As alterações foram salvas corretamente",
  );
});

/* =========================
   CARRINHO
========================= */

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");

  if (!cartCount) return;

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  cartCount.innerText = totalItems;
}

function addToCart(name, price) {
  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  if (totalItems >= 10) {
    showToast(
      "warning",
      "Limite atingido!",
      "Você só pode adicionar até 10 itens no carrinho",
    );

    return;
  }

  const item = cart.find((product) => product.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  saveCart();
  renderCart();
  updateCartCount();

  showToast("success", "Produto adicionado!", `${name} foi para o carrinho`);
}

function decreaseItem(name) {
  const item = cart.find((product) => product.name === name);

  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {
    cart = cart.filter((product) => product.name !== name);
  }

  saveCart();
  renderCart();
  updateCartCount();

  showToast(
    "warning",
    "Quantidade reduzida!",
    `${name} teve uma unidade removida`,
  );
}

function increaseItem(name) {
  const item = cart.find((product) => product.name === name);

  if (!item) return;

  item.quantity++;

  saveCart();
  renderCart();
  updateCartCount();

  showToast(
    "success",
    "+1 unidade adicionada",
    `${name} foi adicionado ao carrinho`,
  );
}

function deleteItem(name) {
  cart = cart.filter((product) => product.name !== name);

  saveCart();
  renderCart();
  updateCartCount();

  showToast("error", "Produto removido!", `${name} foi removido do carrinho`);
}

function clearCart() {
  cart = [];

  localStorage.removeItem("cart");

  renderCart();
  updateCartCount();

  showToast("error", "Carrinho limpo!", "Todos os produtos foram removidos");
}

function renderCart() {
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-bag-shopping"></i>
        <h3>Carrinho vazio</h3>
        <p>Adicione itens para fazer seu pedido</p>
      </div>
    `;
    return;
  }

  cartContent.innerHTML = `
    <div class="cart-items">
      ${cart
        .map(
          (item) => `
        <div class="cart-item">
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}</p>
          </div>

          <div class="cart-controls">
            <button onclick="decreaseItem('${item.name}')">−</button>
            <span>${item.quantity}</span>
            <button onclick="increaseItem('${item.name}')">+</button>

            <button class="delete-item" onclick="deleteItem('${item.name}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>

    <div class="cart-footer">
      <div class="cart-total">
        <span>Total do Pedido</span>
        <strong>R$ ${total.toFixed(2).replace(".", ",")}</strong>
      </div>

      <button class="finish-btn" onclick="goToCheckout()">
        <i class="fa-regular fa-credit-card"></i>
        Finalizar Pedido
      </button>

      <button class="clear-cart-btn" onclick="clearCart()">
        <i class="fa-solid fa-trash-can"></i>
        Limpar Carrinho
      </button>
    </div>
  `;
}

/* =========================
   AÇÕES
========================= */

const cartButton = document.getElementById("cartButton");

if (cartButton) {
  cartButton.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
  });
}

closeCart.addEventListener("click", closeCartSidebar);
cartOverlay.addEventListener("click", closeCartSidebar);

function closeCartSidebar() {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
}

function goWithLoading(page, text = "Carregando . . .") {
  const loadingText = document.querySelector(".loading-text");

  if (loadingText) {
    loadingText.innerText = text;
  }

  loadingScreen.style.display = "flex";

  setTimeout(() => {
    window.location.href = page;
  }, 1200);
}

function goToCheckout() {
  if (cart.length === 0) {
    showToast(
      "error",
      "Carrinho vazio!",
      "Adicione produtos antes de continuar",
    );

    return;
  }

  goWithLoading("checkout.html", "Carregando . . .");
}

/* =========================
   DARK MODE
========================= */

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");

  const icon = themeToggle.querySelector("i");

  icon.classList.remove("fa-regular");
  icon.classList.add("fa-solid");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const icon = themeToggle.querySelector("i");

  icon.classList.toggle("fa-regular");
  icon.classList.toggle("fa-solid");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

/* =========================
   LOGOUT
========================= */

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("loginToast");

  localStorage.setItem(
    "backToast",
    JSON.stringify({
      type: "success",
      title: "Sessão encerrada!",
      message: "Você saiu da Cantina SESI",
    }),
  );

  const loadingText = document.querySelector(".loading-text");

  if (loadingText) {
    loadingText.innerText = "Saindo . . .";
  }

  loadingScreen.style.display = "flex";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1200);
});

/* =========================
   INIT
========================= */

if (userType !== "admin") {
  renderCart();
  updateCartCount();
}

if (localStorage.getItem("loginToast") === "true") {
  showToast("success", "Login realizado!", "Bem-vindo à Cantina SESI");
  localStorage.removeItem("loginToast");
}

const backToast = JSON.parse(localStorage.getItem("backToast"));

if (backToast) {
  showToast(backToast.type, backToast.title, backToast.message);
  localStorage.removeItem("backToast");
}

const userName = document.getElementById("userName");

if (userName) {
  userName.innerText = localStorage.getItem("userName") || "Usuário";
}
