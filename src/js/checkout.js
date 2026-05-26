/* =========================================
   ELEMENTOS
========================================= */

const summaryItems = document.getElementById("summaryItems");
const summaryTotal = document.getElementById("summaryTotal");
const payBtn = document.getElementById("payBtn");
const paymentOptions = document.querySelectorAll(".payment-option");
const loadingScreen = document.getElementById("loadingScreen");
const backCartBtn = document.getElementById("backCartBtn");
const toastContainer = document.getElementById("toastContainer");
const paymentModal = document.getElementById("paymentModal");
const modalPaymentContent = document.getElementById("modalPaymentContent");
const closePaymentModal = document.getElementById("closePaymentModal");

/* =========================================
   DADOS
========================================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedPayment = "";

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
   FORMATAR PREÇO
========================================= */

function formatPrice(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

/* =========================================
   RENDER CHECKOUT
========================================= */

function renderCheckout() {
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    summaryItems.innerHTML = `
      <p class="empty-checkout">
        Nenhum item no carrinho.
      </p>
    `;

    summaryTotal.innerText = "R$ 0,00";
    payBtn.innerText = "Carrinho vazio";
    payBtn.disabled = true;

    return;
  }

  summaryItems.innerHTML = cart
    .map((item) => {
      return `
      <div class="summary-item">

        <div>
          <h3>${item.quantity}x ${item.name}</h3>
        </div>

        <span class="summary-price">
          ${formatPrice(item.price * item.quantity)}
        </span>

      </div>
    `;
    })
    .join("");

  summaryTotal.innerText = formatPrice(total);
  payBtn.innerText = `Pagar ${formatPrice(total)}`;
}

/* =========================================
   MÉTODO PAGAMENTO
========================================= */

paymentOptions.forEach((option) => {
  option.addEventListener("click", () => {
    paymentOptions.forEach((item) => {
      item.classList.remove("selected");
    });

    option.classList.add("selected");

    selectedPayment = option.dataset.payment;

    showToast(
      "success",
      "Pagamento selecionado!",
      `Método escolhido: ${selectedPayment}`,
    );
  });
});

/* =========================================
   BOTÃO PAGAR
========================================= */

payBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("error", "Carrinho vazio!", "Adicione itens antes de pagar");

    return;
  }

  if (selectedPayment === "") {
    showToast(
      "error",
      "Escolha o pagamento!",
      "Selecione PIX, Cartão ou Dinheiro",
    );

    return;
  }

  openPaymentModal(selectedPayment);
});

/* =========================================
   VOLTAR
========================================= */

/* =========================================
   VOLTAR
========================================= */

backCartBtn.addEventListener("click", () => {
  localStorage.setItem(
    "backToast",
    JSON.stringify({
      type: "warning",
      title: "Retornou!",
      message: "Você voltou para o carrinho",
    }),
  );

  goWithLoading("home.html", "Voltando . . .");
});

/* =========================================
   PAGAR
========================================= */

function finishPayment() {
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    id: Date.now(),
    customer: localStorage.getItem("userName") || "Cliente",
    items: cart,
    total: total,
    payment: selectedPayment,
    status: "A Fazer",

    createdAt: new Date().toLocaleDateString("pt-BR"),

    createdTime: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");
  cart = [];

  paymentModal.classList.remove("active");

  goWithLoading("pagamento.html", "Confirmando pagamento...");
}

/* =========================================
   MODAL
========================================= */

function openPaymentModal(method) {
  if (method === "PIX") {
    modalPaymentContent.innerHTML = `
    <h2 class="modal-title">
      Pagamento via PIX
    </h2>

    <img
      class="real-qr"
      src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=Pagamento-Cantina-SESI"
      alt="QR Code PIX"
    />

    <p class="pix-code" id="pixCode">
      00020126580014BR.GOV.BCB.PIX0136cantina-sesi-pagamento5204000053039865802BR5920CANTINA SESI6009SAO PAULO62070503***6304ABCD
    </p>

    <button class="copy-pix-btn" onclick="copyPixCode()">
      Copiar código PIX
    </button>

    <button class="confirm-payment-btn" onclick="finishPayment()">
      Confirmar pagamento
    </button>
  `;
  }

  if (method === "Cartão") {
    modalPaymentContent.innerHTML = `
      <h2 class="modal-title">Pagamento com Cartão</h2>

      <form class="card-form">
        <input type="text" placeholder="Nome impresso no cartão">
        <input type="text" placeholder="Número do cartão">
        <input type="text" placeholder="Validade MM/AA">
        <input type="text" placeholder="CVV">
      </form>

      <br>

      <button class="confirm-payment-btn" onclick="finishPayment()">
        Confirmar pagamento
      </button>
    `;
  }

  if (method === "Dinheiro") {
    modalPaymentContent.innerHTML = `
      <h2 class="modal-title">Pagamento em Dinheiro</h2>

      <p class="money-info">
        Apresente o dinheiro no balcão da cantina no momento da retirada do seu pedido.
      </p>

      <button class="confirm-payment-btn" onclick="finishPayment()">
        Confirmar pedido
      </button>
    `;
  }

  paymentModal.classList.add("active");
}

function copyPixCode() {
  const pixCode = document.getElementById("pixCode").innerText;

  navigator.clipboard.writeText(pixCode);

  showToast("success", "Código copiado!", "O código PIX foi copiado");
}

closePaymentModal.addEventListener("click", () => {
  paymentModal.classList.remove("active");
});

paymentModal.addEventListener("click", (event) => {
  if (event.target === paymentModal) {
    paymentModal.classList.remove("active");
  }
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

renderCheckout();
