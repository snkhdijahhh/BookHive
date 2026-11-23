/* =====================================================
   common.js — shared utilities
   ===================================================== */

const Session = {
  login(user) { sessionStorage.setItem('bh_user', user); },
  
  logout() { 
    sessionStorage.removeItem('bh_user'); 
    localStorage.removeItem('bh_user');
    window.location.href = 'index.html'; 
  },
  
  user() { 
    return localStorage.getItem('bh_user') || sessionStorage.getItem('bh_user'); 
  },
  
  require() {
    if (!this.user()) window.location.href = 'index.html';
  }
};

/* ---------- NAVBAR ---------- */
function renderNavbar(activePage) {
  const navbarEl = document.getElementById('navbar');
  if (!navbarEl) return;

  const user = Session.user() || 'Guest';
  const nav = `
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container">
      <a class="navbar-brand text-primary" href="dashboard.html">
        <i class="bi bi-book-half"></i> BookHive
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link ${activePage==='dashboard'?'active fw-semibold':''}" href="dashboard.html">
              <i class="bi bi-speedometer2"></i> Overview
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${activePage==='books'?'active fw-semibold':''}" href="books.html">
              <i class="bi bi-journal-bookmark"></i> Books
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${activePage==='borrowings'?'active fw-semibold':''}" href="borrowings.html">
              <i class="bi bi-arrow-left-right"></i> Borrowings
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${activePage==='contact'?'active fw-semibold':''}" href="contact.html">
              <i class="bi bi-envelope"></i> Contact
            </a>
          </li>
        </ul>
        <div class="d-flex align-items-center gap-3">
          <span class="text-muted small"><i class="bi bi-person-circle"></i> ${user}</span>
          <button class="btn btn-outline-danger btn-sm" onclick="Session.logout()">
            <i class="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </div>
  </nav>`;
  navbarEl.innerHTML = nav;
}

/* ---------- FOOTER ---------- */
function renderFooter() {
  const footerEl = document.getElementById('footer');
  if (!footerEl) return;

  const footer = `
  <footer class="pt-5 pb-4 mt-auto" style="background: rgba(40, 35, 70, 0.85); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-top: 1px solid rgba(255, 255, 255, 0.1); color: white;">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4">
          <h4 class="fw-bold text-white mb-3"><i class="bi bi-book-half"></i> BookHive</h4>
          <p class="small mb-0" style="color: rgba(255, 255, 255, 0.6);">
            A library built by readers, for readers. Browse our catalog, borrow books, and join our community.
          </p>
        </div>
        <div class="col-6 col-lg-2 offset-lg-2">
          <h6 class="fw-bold text-white mb-3">Our Store</h6>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="dashboard.html" class="footer-link">Overview</a></li>
            <li class="mb-2"><a href="books.html" class="footer-link">Books</a></li>
            <li class="mb-2"><a href="borrowings.html" class="footer-link">Borrowings</a></li>
          </ul>
        </div>
        <div class="col-6 col-lg-2">
          <h6 class="fw-bold text-white mb-3">Further Links</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="javascript:void(0)" class="footer-link" onclick="showInfoModal('terms')">Terms &amp; Conditions</a>
            </li>
            <li class="mb-2">
              <a href="javascript:void(0)" class="footer-link" onclick="showInfoModal('privacy')">Privacy Policy</a>
            </li>
            <li class="mb-2">
              <a href="javascript:void(0)" class="footer-link" onclick="showInfoModal('about')">About Us</a>
            </li>
            <li class="mb-2"><a href="contact.html" class="footer-link">Contact</a></li>
          </ul>
        </div>
      </div>
      <hr style="border-color: rgba(255,255,255,0.15); margin: 1.5rem 0;">
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 small" style="color: rgba(255, 255, 255, 0.5);">
        <div>&copy; 2026 BookHive. All rights reserved.</div>
        <div>
          <a href="https://openlibrary.org" target="_blank" rel="noopener" class="footer-link me-3">
            <i class="bi bi-box-arrow-up-right"></i> OpenLibrary
          </a>
          <a href="README.md" target="_blank" class="footer-link">Documentation</a>
        </div>
      </div>
    </div>
  </footer>
  <style>
    .footer-link {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      transition: color 0.2s ease;
      font-size: 0.9rem;
    }
    .footer-link:hover { color: #fff; }
  </style>`;
  footerEl.innerHTML = footer;
}

/* ---------- INFO MODAL (Terms / Privacy / About) ---------- */
function showInfoModal(type) {
  const contents = {
    terms: {
      title: 'Terms &amp; Conditions',
      body: `
        <p>By using BookHive, you agree to the following terms:</p>
        <ul>
          <li>Books may be borrowed for a maximum of <strong>7 days</strong>.</li>
          <li>Late returns may result in account suspension.</li>
          <li>Users are responsible for the condition of borrowed books.</li>
          <li>All data is stored locally for demonstration purposes only.</li>
        </ul>`
    },
    privacy: {
      title: 'Privacy Policy',
      body: `
        <p>BookHive respects your privacy:</p>
        <ul>
          <li>All user data (username, borrowing records) is stored in <strong>browser localStorage</strong>.</li>
          <li>No data is transmitted to external servers.</li>
          <li>Clearing browser storage will remove all data.</li>
        </ul>`
    },
    about: {
      title: 'About BookHive',
      body: `
        <p>BookHive is a small-scale library management prototype built for the IMS566 Advanced Web Design course.</p>
        <p class="mb-0">It demonstrates authentication, data management, and visualization using Bootstrap 5, Chart.js, and vanilla JavaScript.</p>`
    }
  };

  const info = contents[type] || contents.about;

  // Remove existing modal if any
  const existing = document.getElementById('infoModal');
  if (existing) existing.remove();

  const modalHtml = `
  <div class="modal fade" id="infoModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg" style="border-radius: 1rem;">
        <div class="modal-header border-bottom-0 pb-0">
          <h5 class="modal-title fw-bold">${info.title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body pt-2">
          ${info.body}
        </div>
        <div class="modal-footer border-top-0">
          <button type="button" class="btn btn-primary rounded-pill px-4" data-bs-dismiss="modal">Got it</button>
        </div>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modalEl = document.getElementById('infoModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();

  // Cleanup after close
  modalEl.addEventListener('hidden.bs.modal', () => modalEl.remove());
}