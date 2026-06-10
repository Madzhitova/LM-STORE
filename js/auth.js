class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

// ==============================
// Регистрация
// ==============================

function register() {
  const name = document.getElementById("name").value.trim();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Заполните все поля");

    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Введите корректный Email");

    return;
  }

  if (password.length < 6) {
    alert("Пароль должен содержать минимум 6 символов");

    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find((user) => user.email === email);

  if (exists) {
    alert("Пользователь уже существует");

    return;
  }

  const newUser = new User(name, email, password);

  users.push(newUser);

  localStorage.setItem(
    "users",

    JSON.stringify(users),
  );

  alert("Регистрация прошла успешно!");

  showLogin();
}

// ==============================
// Авторизация
// ==============================

function login() {
  const email = document.getElementById("loginEmail").value.trim();

  const password = document.getElementById("loginPassword").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (item) => item.email === email && item.password === password,
  );

  if (!user) {
    alert("Неверный Email или пароль");

    return;
  }

  localStorage.setItem(
    "currentUser",

    JSON.stringify(user),
  );

  alert(`Добро пожаловать, ${user.name}!`);

  window.location.href = "../index.html";
}

// ==============================
// Выход
// ==============================

function logout() {
  localStorage.removeItem("currentUser");

  location.reload();
}

// ==============================
// Обновление Header
// ==============================

function updateUserUI() {
  const userArea = document.getElementById("userArea");

  if (!userArea) return;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    userArea.innerHTML = `

        <span class="hello-user">

            Привет,
            ${currentUser.name}

        </span>

        <button
            class="logout-btn"
            onclick="logout()">

            Выйти

        </button>

        `;
  } else {
    userArea.innerHTML = `

        <a href="html/auth.html">

            Вход

        </a>

        `;
  }
}

// ==============================
// Переключение вкладок
// ==============================

function showLogin() {
  const loginForm = document.getElementById("loginForm");

  const registerForm = document.getElementById("registerForm");

  if (loginForm) loginForm.style.display = "block";

  if (registerForm) registerForm.style.display = "none";
}

function showRegister() {
  const loginForm = document.getElementById("loginForm");

  const registerForm = document.getElementById("registerForm");

  if (loginForm) loginForm.style.display = "none";

  if (registerForm) registerForm.style.display = "block";
}

// ==============================
// Загрузка
// ==============================

document.addEventListener(
  "DOMContentLoaded",

  () => {
    updateUserUI();
  },
);
