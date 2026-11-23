/* =====================================================
   auth.js — Authentication page logic (Glassmorphism)
   ===================================================== */

const STORAGE_KEY = 'bh_users';

function seedUsers() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const users = [{ username: 'admin', password: 'admin123' }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
}
seedUsers();

const loginForm     = document.getElementById('loginForm');
const registerForm  = document.getElementById('registerForm');
const loginError    = document.getElementById('loginError');
const regError      = document.getElementById('regError');
const authTitle     = document.getElementById('authTitle');
const authSubtitle  = document.getElementById('authSubtitle');
const loginUserInput = document.getElementById('loginUser');
const loginPassInput = document.getElementById('loginPass');
const rememberMeInput = document.getElementById('rememberMe');

// ---- FUNGSI TUKAR PASSWORD JADI NAMPAK/TERSEMBUNYI ----
function togglePassword(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('bi-eye-slash');
    icon.classList.add('bi-eye');
  } else {
    input.type = 'password';
    icon.classList.remove('bi-eye');
    icon.classList.add('bi-eye-slash');
  }
}

// ---- FUNGSI ENTER DARI USERNAME KE PASSWORD ----
if (loginUserInput && loginPassInput) {
  loginUserInput.addEventListener('keydown', function(e) {
    // Jika butang Enter ditekan
    if (e.key === 'Enter') {
      e.preventDefault(); // Halang form daripada submit secara automatik
      loginPassInput.focus(); // Pindahkan kursor ke kotak password
    }
  });
}

// ---- TUKAR ANTARA LOGIN & REGISTER ----
document.getElementById('showRegister').addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.remove('active');
  registerForm.classList.add('active');
  
  authTitle.textContent = 'Create an account';
  authSubtitle.textContent = 'Join BookHive to start borrowing and managing your books.';
  
  loginError.classList.add('d-none');
});

document.getElementById('showLogin').addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.classList.remove('active');
  loginForm.classList.add('active');
  
  authTitle.textContent = 'Welcome back!';
  authSubtitle.textContent = 'Sign in to access your library, borrow books, and manage your account.';
  
  regError.classList.add('d-none');
});

// ---- LOGIN ----
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = loginUserInput.value.trim();
  const password = loginPassInput.value.trim();

  if (!username || !password) {
    return showError(loginError, 'Please enter both username and password.');
  }

  const users = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const match = users.find(u => u.username === username && u.password === password);

  if (!match) {
    return showError(loginError, 'Invalid username or password.');
  }

  // LOGIK REMEMBER ME
  if (rememberMeInput && rememberMeInput.checked) {
    localStorage.setItem('bh_user', username);
    sessionStorage.removeItem('bh_user');
  } else {
    sessionStorage.setItem('bh_user', username);
    localStorage.removeItem('bh_user');
  }

  window.location.href = 'dashboard.html';
});

// ---- REGISTER ----
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('regUser').value.trim();
  const pass     = document.getElementById('regPass').value.trim();
  const confirm  = document.getElementById('regConfirm').value.trim();

  if (!username || !pass || !confirm) {
    return showError(regError, 'All fields are required.');
  }
  if (pass.length < 6) {
    return showError(regError, 'Password must be at least 6 characters long.');
  }
  if (pass !== confirm) {
    return showError(regError, 'Passwords do not match.');
  }

  const users = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (users.some(u => u.username === username)) {
    return showError(regError, 'Username already taken.');
  }

  users.push({ username, password: pass });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  sessionStorage.setItem('bh_user', username);
  localStorage.removeItem('bh_user');

  window.location.href = 'dashboard.html';
});

// ---- PAPAR ERROR ----
function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('d-none');
}