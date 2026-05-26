/* =========================================
   ELEMENTOS
========================================= */

const togglePassword =
document.getElementById("togglePassword");

const password =
document.getElementById("password");

const themeToggle =
document.getElementById("themeToggle");

const loginBtn =
document.querySelector(".login-btn");

const loginForm =
document.getElementById("loginForm");

const loadingScreen =
document.getElementById("loadingScreen");

const toastContainer =
document.getElementById("toastContainer");

localStorage.removeItem("loginToast");

const helpButton = document.getElementById("helpButton");
const helpModal = document.getElementById("helpModal");
const closeHelp = document.getElementById("closeHelp");


/* =========================================
   TOAST
========================================= */

function showToast(type, title, message){

  const toast =
  document.createElement("div");

  toast.className =
  `toast ${type}`;

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
   MOSTRAR / ESCONDER SENHA
========================================= */

togglePassword.addEventListener("click", () => {
  const type =
    password.getAttribute("type") === "password"
      ? "text"
      : "password";

  password.setAttribute("type", type);

  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

/* =========================================
   DARK MODE
========================================= */

/* VERIFICA TEMA SALVO */
if(localStorage.getItem("theme") === "dark"){
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

  if(document.body.classList.contains("dark")){
    localStorage.setItem("theme", "dark");
  }else{
    localStorage.setItem("theme", "light");
  }
});


/* =========================================
   LOGIN
========================================= */

function handleLogin() {
  const email = document.querySelector("input[type='email']").value.trim();
  const senha = password.value.trim();

  const adminEmail = "admin@sesisenai.com";
  const adminSenha = "admin123";

  const userEmail = "marco.costa@portalsenaisp.org.br";
  const userSenha = "123456";

  if (email === adminEmail && senha === adminSenha) {
    localStorage.setItem("userType", "admin");
    localStorage.setItem("userName", "Administrador");

    loadingScreen.style.display = "flex";
    localStorage.setItem("loginToast", "true");

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1800);

    return;
  }

  if (email === userEmail && senha === userSenha) {
    localStorage.setItem("userType", "user");
    localStorage.setItem("userName", "Marco Silva");

    loadingScreen.style.display = "flex";
    localStorage.setItem("loginToast", "true");

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1800);

    return;
  }

  showToast("error", "Login inválido!", "Email ou senha incorretos");
}

loginBtn.addEventListener("click", handleLogin);

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleLogin();
});

/* =========================================
   TOAST AO VOLTAR
========================================= */

const backToast = JSON.parse(localStorage.getItem("backToast"));

if (backToast) {
  showToast(backToast.type, backToast.title, backToast.message);
  localStorage.removeItem("backToast");
}

document.addEventListener("keydown", (event) => {
  if(event.key === "Enter"){
    event.preventDefault();
    loginBtn.click();
  }
});

helpButton.addEventListener("click", () => {
  helpModal.classList.add("active");
});

closeHelp.addEventListener("click", () => {
  helpModal.classList.remove("active");
});

helpModal.addEventListener("click", (event) => {
  if(event.target === helpModal){
    helpModal.classList.remove("active");
  }
});