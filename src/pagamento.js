const backHomeBtn = document.getElementById("backHomeBtn");
const loadingScreen = document.getElementById("loadingScreen");
const toastContainer = document.getElementById("toastContainer");

if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark");
}

function showToast(type, title, message){
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  toast.innerHTML = `
    <i class="fa-solid fa-circle-check"></i>

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

window.addEventListener("load", () => {
  showToast(
    "success",
    "Pagamento confirmado!",
    "Seu pedido foi realizado com sucesso"
  );
});

backHomeBtn.addEventListener("click", () => {
  const loadingText = document.querySelector(".loading-text");

  if(loadingText){
    loadingText.innerText = "Carregando . . .";
  }

  loadingScreen.style.display = "flex";

  setTimeout(() => {
    window.location.href = "home.html";
  }, 1200);
});