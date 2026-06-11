const myOrdersList = document.getElementById("myOrdersList");
const backHomeBtn = document.getElementById("backHomeBtn");
const loadingScreen = document.getElementById("loadingScreen");

function formatPrice(value){
  return `R$ ${Number(value).toFixed(2).replace(".", ",")}`;
}

function renderMyOrders(){
  const userName =
    localStorage.getItem("userName") || "Cliente";

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const myOrders = orders.filter((order) => {
    return order.customer === userName;
  });

  if(myOrders.length === 0){
    myOrdersList.innerHTML = `
      <div class="empty-orders">
        <i class="fa-solid fa-bag-shopping"></i>
        <h3>Nenhum pedido encontrado</h3>
        <p>Quando você fizer um pedido, ele aparecerá aqui.</p>
      </div>
    `;
    return;
  }

  myOrdersList.innerHTML = myOrders
    .map((order) => {
      const itemsText = order.items
        .map((item) => {
          return `${item.quantity}x ${item.name}`;
        })
        .join(", ");

      const statusText =
        order.status === "Pronto"
          ? "Pronto para retirar"
          : "Em preparo";

      const statusClass =
        order.status === "Pronto"
          ? "pronto"
          : "preparo";

      return `
        <div class="order-card">
          <div class="order-top">
            <h3>Pedido #${order.id}</h3>

            <span class="status ${statusClass}">
              ${statusText}
            </span>
          </div>

          <p class="order-info">
            ${order.createdAt} às ${order.createdTime || "--:--"}
          </p>

          <p class="order-items">
            ${itemsText}
          </p>

          <strong class="order-total">
            ${formatPrice(order.total)}
          </strong>
        </div>
      `;
    })
    .join("");
}

backHomeBtn.addEventListener("click", () => {
  loadingScreen.style.display = "flex";

  setTimeout(() => {
    window.location.href = "home.html";
  }, 1000);
});

renderMyOrders();

setInterval(() => {
  renderMyOrders();
}, 2000);