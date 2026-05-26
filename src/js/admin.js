/* =========================================
   ELEMENTOS
========================================= */

const ordersList = document.getElementById("ordersList");
const ordersCount = document.getElementById("ordersCount");

const totalOrders = document.getElementById("totalOrders");
const pendingOrders = document.getElementById("pendingOrders");
const doneOrders = document.getElementById("doneOrders");

const productsAdminGrid = document.getElementById("productsAdminGrid");

const adminTabs = document.querySelectorAll(".admin-tab");
const ordersTab = document.getElementById("ordersTab");
const productsTab = document.getElementById("productsTab");
const statsTab = document.getElementById("statsTab");

const backHomeBtn = document.getElementById("backHomeBtn");
const loadingScreen = document.getElementById("loadingScreen");
const toastContainer = document.getElementById("toastContainer");

const editModal = document.getElementById("editModal");
const closeEditModal = document.getElementById("closeEditModal");
const editName = document.getElementById("editName");
const editSub = document.getElementById("editSub");
const editPrice = document.getElementById("editPrice");
const editImage = document.getElementById("editImage");
const saveEditBtn = document.getElementById("saveEditBtn");

const ordersToday = document.getElementById("ordersToday");
const billingToday = document.getElementById("billingToday");
const monthlyBilling = document.getElementById("monthlyBilling");
const todayOrdersList = document.getElementById("todayOrdersList");

const orderFilters = document.querySelectorAll(".order-filter");
let currentOrderFilter = "todos";

/* =========================================
   DADOS
========================================= */

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let products = JSON.parse(localStorage.getItem("adminProducts")) || [
  {
    id: 1,
    name: "X-Burger",
    sub: "Hambúrguer",
    price: 12,
    image: "img/produtos/xburger.png",
    active: true,
  },
  {
    id: 2,
    name: "X-Salada",
    sub: "Hambúrguer",
    price: 14,
    image: "img/produtos/xsalada.png",
    active: true,
  },
  {
    id: 3,
    name: "Misto Quente",
    sub: "Sanduíche",
    price: 8,
    image: "img/produtos/misto.png",
    active: true,
  },
  {
    id: 4,
    name: "Hot Dog",
    sub: "Lanche rápido",
    price: 10,
    image: "img/produtos/hotdog.png",
    active: true,
  },

  {
    id: 5,
    name: "Coxinha",
    sub: "Salgadinho",
    price: 6,
    image: "img/produtos/coxinha.png",
    active: true,
  },
  {
    id: 6,
    name: "Esfiha",
    sub: "Salgado assado",
    price: 7,
    image: "img/produtos/esfiha.png",
    active: true,
  },
  {
    id: 7,
    name: "Pastel",
    sub: "Salgado frito",
    price: 8,
    image: "img/produtos/pastel.png",
    active: true,
  },
  {
    id: 8,
    name: "Pão de Queijo",
    sub: "Salgado assado",
    price: 5,
    image: "img/produtos/pao-queijo.png",
    active: true,
  },

  {
    id: 9,
    name: "Suco Natural",
    sub: "Bebida gelada",
    price: 7,
    image: "img/produtos/suco.png",
    active: true,
  },
  {
    id: 10,
    name: "Água Mineral",
    sub: "Bebida",
    price: 3,
    image: "img/produtos/agua.png",
    active: true,
  },
  {
    id: 11,
    name: "Refrigerante",
    sub: "Bebida gelada",
    price: 6,
    image: "img/produtos/refrigerante.png",
    active: true,
  },
  {
    id: 12,
    name: "Achocolatado",
    sub: "Bebida láctea",
    price: 5,
    image: "img/produtos/achocolatado.png",
    active: true,
  },

  {
    id: 13,
    name: "Bolo de Chocolate",
    sub: "Bolo",
    price: 7,
    image: "img/produtos/bolo-chocolate.png",
    active: true,
  },
  {
    id: 14,
    name: "Brigadeiro",
    sub: "Docinho",
    price: 3,
    image: "img/produtos/brigadeiro.png",
    active: true,
  },
  {
    id: 15,
    name: "Bala Sortida",
    sub: "Bala",
    price: 2,
    image: "img/produtos/balas.png",
    active: true,
  },
  {
    id: 16,
    name: "Brownie",
    sub: "Sobremesa",
    price: 8,
    image: "img/produtos/brownie.png",
    active: true,
  },

  {
    id: 17,
    name: "Combo Lanche",
    sub: "Lanche + Bebida",
    price: 18,
    image: "img/produtos/combo-lanche.png",
    active: true,
  },
  {
    id: 18,
    name: "Combo Salgado",
    sub: "Salgado + Suco",
    price: 12,
    image: "img/produtos/combo-salgado.png",
    active: true,
  },
  {
    id: 19,
    name: "Combo Doce",
    sub: "Doce + Bebida",
    price: 10,
    image: "img/produtos/combo-doce.png",
    active: true,
  },

  {
    id: 20,
    name: "Sorvete de Chocolate",
    sub: "Sorvete",
    price: 6,
    image: "img/produtos/sorvete-chocolate.png",
    active: true,
  },
  {
    id: 21,
    name: "Picolé de Fruta",
    sub: "Picolé",
    price: 4,
    image: "img/produtos/picole.png",
    active: true,
  },
  {
    id: 22,
    name: "Açaí no Copo",
    sub: "Gelado",
    price: 12,
    image: "img/produtos/acai.png",
    active: true,
  },
];

let currentEditingProduct = null;

/* =========================================
   HELPERS
========================================= */

function saveProducts() {
  localStorage.setItem("adminProducts", JSON.stringify(products));
}

function formatPrice(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

/* =========================================
   TOAST
========================================= */

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

/* =========================================
   LOADING
========================================= */

function goWithLoading(page, text = "Carregando...") {
  const loadingText = document.querySelector(".loading-text");

  if (loadingText) {
    loadingText.innerText = text;
  }

  loadingScreen.style.display = "flex";

  setTimeout(() => {
    window.location.href = page;
  }, 1200);
}

/* =========================================
   ABAS
========================================= */

adminTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    adminTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    ordersTab.classList.remove("active");
    productsTab.classList.remove("active");
    statsTab.classList.remove("active");

    if (tab.dataset.tab === "orders") {
      ordersTab.classList.add("active");
      renderOrders();
    }

    if (tab.dataset.tab === "products") {
      productsTab.classList.add("active");
      renderProducts();
    }

    if (tab.dataset.tab === "stats") {
      statsTab.classList.add("active");
      renderStats();
    }
  });
});

function renderStats() {
  const today = new Date().toLocaleDateString("pt-BR");

  const todayOrders = orders.filter((order) => {
    return order.createdAt === today;
  });

  const totalToday = todayOrders.reduce((sum, order) => {
    return sum + order.total;
  }, 0);

  const totalMonth = orders.reduce((sum, order) => {
    return sum + order.total;
  }, 0);

  ordersToday.innerText = todayOrders.length;
  billingToday.innerText = formatPrice(totalToday);
  monthlyBilling.innerText = formatPrice(totalMonth);

  if (todayOrders.length === 0) {
    todayOrdersList.innerHTML = `
      <p class="empty-orders">
        Nenhum pedido hoje.
      </p>
    `;
    return;
  }

  todayOrdersList.innerHTML = todayOrders
    .map((order) => {
      return `
      <div class="order-card">
        <div>
          <h3>Pedido #${order.id}</h3>
          <p>${order.customer}</p>
          <strong>${formatPrice(order.total)}</strong>
        </div>

        <span class="order-status ${order.status === "Pronto" ? "done" : "pending"}">
          ${order.status}
        </span>
      </div>
    `;
    })
    .join("");
}

/* =========================================
   PEDIDOS
========================================= */

function renderOrders() {
  orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (ordersCount) {
    ordersCount.innerText = orders.length;
  }

  if (totalOrders) {
    totalOrders.innerText = orders.length;
  }

  if (pendingOrders) {
    pendingOrders.innerText = orders.filter(
      (order) => order.status === "A Fazer",
    ).length;
  }

  if (doneOrders) {
    doneOrders.innerText = orders.filter(
      (order) => order.status === "Pronto",
    ).length;
  }

  let filteredOrders = orders;

  if (currentOrderFilter !== "todos") {
    filteredOrders = orders.filter(
      (order) => order.status === currentOrderFilter,
    );
  }

  if (filteredOrders.length === 0) {
    ordersList.innerHTML = `
      <div class="empty-orders">
        <i class="fa-solid fa-box-open"></i>
        <h3>Nenhum pedido encontrado</h3>
        <p>Os pedidos aparecerão aqui</p>
      </div>
    `;
    return;
  }

  ordersList.innerHTML = filteredOrders
    .map((order) => {
      const itemsText = order.items
        .map((item) => {
          return `${item.quantity}x ${item.name}`;
        })
        .join(", ");

      return `
      <div class="order-card">
        <div class="order-info">
          <h3>Pedido #${order.id}</h3>

          <p class="order-customer">
            ${order.customer} — ${order.createdAt} às ${order.createdTime || "--:--"}
          </p>

          <p class="order-items">
            ${itemsText}
          </p>

          <strong class="order-total">
            ${formatPrice(order.total)}
          </strong>
        </div>

        <button
          class="order-status-btn ${order.status === "Pronto" ? "done" : "pending"}"
          onclick="toggleOrderStatus(${order.id})"
        >
          ${order.status}
        </button>
      </div>
    `;
    })
    .join("");
}

orderFilters.forEach((button) => {
  button.addEventListener("click", () => {
    orderFilters.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    currentOrderFilter = button.dataset.filter;

    renderOrders();
  });
});

function toggleOrderStatus(id) {
  const order = orders.find((order) => {
    return order.id === id;
  });

  if (!order) return;

  order.status = order.status === "A Fazer" ? "Pronto" : "A Fazer";

  localStorage.setItem("orders", JSON.stringify(orders));

  renderOrders();
  renderStats();

  showToast(
    "success",
    "Status atualizado!",
    `Pedido #${order.id} agora está ${order.status}`,
  );
}

/* =========================================
   PRODUTOS
========================================= */

function renderProducts() {
  const productsCount = document.getElementById("productsCount");

  if (productsCount) {
    productsCount.innerText = products.length;
  }

  if (products.length === 0) {
    productsAdminGrid.innerHTML = `
      <div class="empty-orders">
        <i class="fa-solid fa-box-open"></i>

        <h3>
          Nenhum produto cadastrado
        </h3>
      </div>
    `;

    return;
  }

  productsAdminGrid.innerHTML = products
    .map((product) => {
      return `
      <div class="admin-product-row">

        <div class="product-name-cell">

          <img
            src="${product.image}"
            alt="${product.name}"
          >

          <span>
            ${product.name}
          </span>

        </div>

        <span class="product-category">
          ${product.sub}
        </span>

        <span class="product-price">
          ${formatPrice(product.price)}
        </span>

        <span class="product-status ${product.active ? "active" : "off"}">
          <button
            class="switch-product"
            onclick="toggleProductStatus(${product.id})"
          >
            <span></span>
          </button>
        </span>

        <div class="product-actions">

          <button
            class="edit-product"
            onclick="openEditProduct(${product.id})"
          >
            <i class="fa-solid fa-pen"></i>
          </button>

          <button
            class="delete-product"
            onclick="deleteProduct(${product.id})"
          >
            <i class="fa-solid fa-trash"></i>
          </button>

        </div>

      </div>
    `;
    })
    .join("");
}

function openEditProduct(id) {
  const product = products.find((product) => product.id === id);

  if (!product) return;

  currentEditingProduct = product;

  editName.value = product.name;
  editSub.value = product.sub;
  editPrice.value = product.price;
  editImage.value = product.image;

  editModal.classList.add("active");
}

saveEditBtn.addEventListener("click", () => {
  if (!currentEditingProduct) return;

  currentEditingProduct.name = editName.value;
  currentEditingProduct.sub = editSub.value;
  currentEditingProduct.price = Number(editPrice.value);
  currentEditingProduct.image = editImage.value;

  saveProducts();
  renderProducts();

  editModal.classList.remove("active");

  showToast("info", "Produto editado!", "Alterações salvas corretamente");
});

function toggleProductStatus(id) {
  const product = products.find((product) => product.id === id);

  if (!product) return;

  product.active = !product.active;

  saveProducts();
  renderProducts();

  showToast(
    "warning",
    "Status alterado!",
    product.active
      ? "Produto ativado para venda"
      : "Produto desativado para venda",
  );
}

function deleteProduct(id) {
  const product = products.find((product) => product.id === id);

  if (!product) return;

  products = products.filter((product) => product.id !== id);

  saveProducts();
  renderProducts();

  showToast("error", "Produto excluído!", `${product.name} foi removido`);
}

closeEditModal.addEventListener("click", () => {
  editModal.classList.remove("active");
});

editModal.addEventListener("click", (event) => {
  if (event.target === editModal) {
    editModal.classList.remove("active");
  }
});

/* =========================================
   VOLTAR
========================================= */

backHomeBtn.addEventListener("click", () => {
  goWithLoading("home.html", "Carregando . . .");
});

/* =========================================
   DARK MODE
========================================= */

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

/* =========================================
   INIT
========================================= */

saveProducts();
renderProducts();
renderOrders();

if (typeof renderStats === "function") {
  renderStats();
}
