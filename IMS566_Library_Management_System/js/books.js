/* =====================================================
   books.js — Book catalog with Pagination
   ===================================================== */

const BOOKS = [
  // 🇲🇾 MALAYSIA
  { id: 1,  title: 'Andai Itu Takdirnya', author: 'Siti Rosmizah', category: 'Malaysia', year: 2011, available: true, color: 'malaysia', cover: 'images/andai.jpg' },
  { id: 2,  title: 'Bayang Sofea', author: 'Teme Abdullah', category: 'Malaysia', year: 2024, available: true, color: 'malaysia', cover: 'images/bayang.jpg' },
  { id: 3,  title: 'The Weight of Our Sky', author: 'Hanna Alkaf', category: 'Malaysia', year: 2019, available: true, color: 'malaysia', cover: 'images/the_weight.jpg' },
  { id: 4,  title: 'Rahsia Danny', author: 'Teme Abdullah', category: 'Malaysia', year: 2025, available: false, color: 'malaysia', cover: 'images/rahsia.jpg' },
  { id: 5,  title: 'Laskar Pelangi', author: 'Andrea Hirata', category: 'Malaysia', year: 2005, available: true, color: 'malaysia', cover: 'images/laskar.jpg' },
  { id: 6,  title: 'Empayar', author: 'Teme Abdullah', category: 'Malaysia', year: 2019, available: true, color: 'malaysia', cover: 'images/empayar.jpg' },
  { id: 7,  title: 'Lelaki Astatine', author: 'Anjell', category: 'Malaysia', year: 2024, available: true, color: 'malaysia', cover: 'images/astatine.jpg' },
  { id: 8,  title: 'Bukan Kerana Aku Tak Cinta', author: 'E-man Sufi', category: 'Malaysia', year: 2019, available: true, color: 'malaysia', cover: 'images/bukan.jpg' },
  { id: 9,  title: 'The American Boyfriend', author: 'Ivy Ngeow', category: 'Malaysia', year: 2018, available: true, color: 'malaysia', cover: 'images/american.jpg' },
  { id: 10, title: 'Rindu', author: 'Tere Liye', category: 'Malaysia', year: 2014, available: true, color: 'malaysia', cover: 'images/rindu.jpg' },
  { id: 11, title: 'Ayat-Ayat Cinta', author: 'Habiburrahman El Shirazy', category: 'Malaysia', year: 2004, available: false, color: 'malaysia', cover: 'images/ayat.jpg' },

  // 📖 FICTION
  { id: 13, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', year: 1925, available: true, color: 'novel', cover: 'images/gatsby.jpg' },
  { id: 14, title: '1984', author: 'George Orwell', category: 'Fiction', year: 1949, available: false, color: 'novel', cover: 'images/1984.jpg' },
  { id: 15, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', year: 1960, available: true, color: 'novel', cover: 'images/mockingbird.jpg' },
  { id: 16, title: 'Atomic Habits', author: 'James Clear', category: 'Fiction', year: 2018, available: true, color: 'novel', cover: 'images/atomic.jpg' },
  { id: 17, title: 'The Fault in Our Stars', author: 'John Green', category: 'Fiction', year: 2012, available: true, color: 'novel', cover: 'images/fault.jpg' },
  { id: 18, title: 'The Silent Patient', author: 'Alex Michaelides', category: 'Fiction', year: 2019, available: true, color: 'novel', cover: 'images/silent.jpg' },
  { id: 19, title: "A Good Girl's Guide to Murder", author: 'Holly Jackson', category: 'Fiction', year: 2019, available: true, color: 'novel', cover: 'images/goodgirl.jpg' },
  { id: 20, title: 'The Midnight Library', author: 'Matt Haig', category: 'Fiction', year: 2020, available: true, color: 'novel', cover: 'images/midnight.jpg' },
  { id: 21, title: 'Where the Crawdads Sing', author: 'Delia Owens', category: 'Fiction', year: 2018, available: true, color: 'novel', cover: 'images/crawdads.jpg' },
  { id: 22, title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', year: 1988, available: false, color: 'novel', cover: 'images/alchemist.jpg' },
  { id: 23, title: 'The Kite Runner', author: 'Khaled Hosseini', category: 'Fiction', year: 2003, available: true, color: 'novel', cover: 'images/kite.jpg' },
  { id: 24, title: 'Life of Pi', author: 'Yann Martel', category: 'Fiction', year: 2001, available: true, color: 'novel', cover: 'images/pi.jpg' },
  { id: 25, title: 'The Book Thief', author: 'Markus Zusak', category: 'Fiction', year: 2005, available: true, color: 'novel', cover: 'images/thief.jpg' },
  { id: 26, title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Fiction', year: 1951, available: true, color: 'novel', cover: 'images/catcher.jpg' },
  { id: 27, title: 'The Hunger Games', author: 'Suzanne Collins', category: 'Fiction', year: 2008, available: false, color: 'novel', cover: 'images/hunger.jpg' },

  // 🌌 SCIENCE
  { id: 28, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', year: 1988, available: false, color: 'science', cover: 'images/brief.jpg' },
  { id: 29, title: 'Cosmos', author: 'Carl Sagan', category: 'Science', year: 1980, available: true, color: 'science', cover: 'images/cosmos.jpg' },
  { id: 30, title: 'The Selfish Gene', author: 'Richard Dawkins', category: 'Science', year: 1976, available: true, color: 'science', cover: 'images/gene.jpg' },
  { id: 31, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Science', year: 2011, available: true, color: 'science', cover: 'images/thinking.jpg' },
  { id: 32, title: 'The Origin of Species', author: 'Charles Darwin', category: 'Science', year: 1859, available: true, color: 'science', cover: 'images/origin.jpg' },

  // 🏛️ HISTORY
  { id: 33, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', year: 2011, available: true, color: 'history', cover: 'images/sapiens.jpg' },
  { id: 34, title: 'The Silk Roads', author: 'Peter Frankopan', category: 'History', year: 2015, available: true, color: 'history', cover: 'images/silk.jpg' },
  { id: 35, title: 'Guns, Germs, and Steel', author: 'Jared Diamond', category: 'History', year: 1997, available: true, color: 'history', cover: 'images/guns.jpg' },
  { id: 36, title: 'Homo Deus', author: 'Yuval Noah Harari', category: 'History', year: 2016, available: true, color: 'history', cover: 'images/deus.jpg' },

  // 💻 TECHNOLOGY
  { id: 37, title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', year: 2008, available: true, color: 'tech', cover: 'images/clean.jpg' },
  { id: 38, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Technology', year: 1999, available: false, color: 'tech', cover: 'images/pragmatic.jpg' },
  { id: 39, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Technology', year: 2009, available: true, color: 'tech', cover: 'images/algo.jpg' },
  { id: 40, title: 'Steve Jobs', author: 'Walter Isaacson', category: 'Technology', year: 2011, available: true, color: 'tech', cover: 'images/jobs.jpg' },

  // 🎓 EDUCATION
  { id: 41, title: 'Mathematics Form 5', author: 'KPM Malaysia', category: 'Education', year: 2020, available: true, color: 'education', cover: 'images/math.jpg' },
  { id: 42, title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Education', year: 2012, available: true, color: 'education', cover: 'images/grammar.jpg' },
  { id: 43, title: 'Sains Tingkatan 4', author: 'KPM Malaysia', category: 'Education', year: 2021, available: true, color: 'education', cover: 'images/sains.jpg' },

  // 🐉 FANTASY
  { id: 44, title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy', year: 1937, available: true, color: 'fantasy', cover: 'images/hobbit.jpg' },
  { id: 45, title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling', category: 'Fantasy', year: 1997, available: true, color: 'fantasy', cover: 'images/hp.jpg' },
  { id: 46, title: 'The Name of the Wind', author: 'Patrick Rothfuss', category: 'Fantasy', year: 2007, available: true, color: 'fantasy', cover: 'images/wind.jpg' },
  { id: 47, title: 'A Game of Thrones', author: 'George R.R. Martin', category: 'Fantasy', year: 1996, available: true, color: 'fantasy', cover: 'images/thrones.jpg' },

  // 🔪 THRILLER
  { id: 48, title: 'Gone Girl', author: 'Gillian Flynn', category: 'Thriller', year: 2012, available: true, color: 'thriller', cover: 'images/gone.jpg' },
  { id: 49, title: 'The Girl on the Train', author: 'Paula Hawkins', category: 'Thriller', year: 2015, available: true, color: 'thriller', cover: 'images/train.jpg' },
  { id: 50, title: 'The Da Vinci Code', author: 'Dan Brown', category: 'Thriller', year: 2003, available: true, color: 'thriller', cover: 'images/davinci.jpg' },
  
  // 💖 ROMANCE
  { id: 51, title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Romance', year: 1813, available: true, color: 'romance', cover: 'images/pride.jpg' },
  { id: 52, title: 'Me Before You', author: 'Jojo Moyes', category: 'Romance', year: 2012, available: true, color: 'romance', cover: 'images/me.jpg' },
  { id: 53, title: 'It Ends with Us', author: 'Colleen Hoover', category: 'Romance', year: 2016, available: true, color: 'romance', cover: 'images/itends.jpg' }
];

function initBooks() {
  if(!localStorage.getItem('bh_books')) {
    localStorage.setItem('bh_books', JSON.stringify(BOOKS));
  }
}
initBooks();

function getBooks() { return JSON.parse(localStorage.getItem('bh_books')); }
function saveBooks(books) { localStorage.setItem('bh_books', JSON.stringify(books)); }

const grid = document.getElementById('bookGrid');
const searchInput = document.getElementById('searchInput');
const bookCountEl = document.getElementById('bookCount');
const pageInfo = document.getElementById('pageInfo');

// --- PAGINATION SETTINGS ---
let activeCategory = 'all';
let currentPage = 1;
const ITEMS_PER_PAGE = 8; 

function fmtDate(d) { return d.toISOString().split('T')[0]; }

function renderBooks() {
  if (!grid) return;
  const books = getBooks();
  const q = (searchInput ? searchInput.value : '').toLowerCase().trim();

  // 1. Filter Books
  const filtered = books.filter(b => {
    const matchSearch = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
    const matchCategory = activeCategory === 'all' || b.category === activeCategory;
    return matchSearch && matchCategory;
  });

  if (bookCountEl) bookCountEl.textContent = filtered.length;

  // 2. Calculate Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  // 3. Get books for this page only
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedBooks = filtered.slice(startIndex, endIndex);

  // 4. Update Info Text
  if (pageInfo) {
    if (filtered.length === 0) {
      pageInfo.textContent = 'Showing 0 books';
    } else {
      pageInfo.textContent = `Showing ${startIndex + 1} - ${Math.min(endIndex, filtered.length)} of ${filtered.length} books`;
    }
  }

  // 5. Render Book Cards
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-12 text-center py-5 text-muted"><i class="bi bi-search fs-1 d-block mb-2"></i>No books matched your filter.</div>`;
  } else {
    grid.innerHTML = paginatedBooks.map(book => {
      const coverHtml = book.cover 
        ? `<img src="${book.cover}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image';">`
        : `<img src="https://via.placeholder.com/400x300?text=No+Image" alt="No Image">`;

      return `
      <div class="col-12 col-md-6 col-lg-3"> 
        <div class="card book-card shadow-sm h-100" onclick="openBorrowModal(${book.id})" style="cursor: pointer;">
          <div class="book-cover-container">
            ${coverHtml}
            <div class="bookmark-icon" onclick="event.stopPropagation();">
              <i class="bi bi-bookmark"></i>
            </div>
          </div>
          <div class="card-body">
            <span class="badge-category-small">${book.category}</span>
            <h5 class="book-title text-truncate" title="${book.title}">${book.title}</h5>
            <p class="book-author">by ${book.author} &middot; ${book.year}</p>
            <div class="book-actions">
              <span class="${book.available ? 'badge-status-available' : 'badge-status-borrowed'}">
                <i class="bi ${book.available ? 'bi-check-circle' : 'bi-x-circle'} me-1"></i>
                ${book.available ? 'Available' : 'Borrowed'}
              </span>
              ${book.available
                ? `<button class="btn btn-borrow" onclick="event.stopPropagation(); openBorrowModal(${book.id})"><i class="bi bi-journal-plus me-1"></i> Borrow</button>`
                : `<button class="btn btn-return" onclick="event.stopPropagation(); returnBook(${book.id})"><i class="bi bi-arrow-return-left me-1"></i> Return</button>`}
            </div>
          </div>
        </div>
      </div>
    `}).join('');
  }

  // 6. Render Pagination Buttons
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const paginationUl = document.getElementById('pagination');
  if (!paginationUl) return;

  paginationUl.querySelectorAll('.page-number').forEach(el => el.remove());

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (totalPages <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    return;
  } else {
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
  }

  prevBtn.classList.toggle('disabled', currentPage === 1);
  nextBtn.classList.toggle('disabled', currentPage === totalPages);

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = `page-item page-number ${i === currentPage ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link" href="javascript:void(0)" onclick="goToPage(${i})">${i}</a>`;
    fragment.appendChild(li);
  }

  paginationUl.insertBefore(fragment, nextBtn);
}

window.goToPage = function(page) {
  currentPage = page;
  renderBooks();
  window.scrollTo({ top: 150, behavior: 'smooth' });
};

window.changePage = function(direction) {
  if (direction === 'prev' && currentPage > 1) {
    currentPage--;
    renderBooks();
    window.scrollTo({ top: 150, behavior: 'smooth' });
  } else if (direction === 'next') {
    const books = getBooks();
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const filtered = books.filter(b => {
      const matchSearch = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
      const matchCategory = activeCategory === 'all' || b.category === activeCategory;
      return matchSearch && matchCategory;
    });
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    
    if (currentPage < totalPages) {
      currentPage++;
      renderBooks();
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  }
};

// ==========================================
// POP-UP (MODAL) LOGIC & OTHERS
// ==========================================
function openBorrowModal(id) {
  const books = getBooks();
  const book = books.find(b => b.id === id);
  if (!book) return;

  if (!book.available) {
    alert('This book is currently borrowed by someone else.');
    return;
  }

  document.getElementById('modalBookCover').src = book.cover || 'https://via.placeholder.com/200x300?text=No+Image';
  document.getElementById('modalBookTitle').textContent = 'Borrow Book';
  document.getElementById('modalBookTitleInfo').textContent = book.title;
  document.getElementById('modalBookAuthor').textContent = `by ${book.author}`;
  document.getElementById('modalBookCategory').textContent = book.category;
  
  document.getElementById('borrowBookId').value = book.id;
  document.getElementById('borrowMember').value = (typeof Session !== 'undefined' && Session.user()) ? Session.user() : '';
  
  const today = new Date();
  const maxDue = new Date();
  maxDue.setDate(today.getDate() + 7); // Set maximum limit to 7 days
  
  document.getElementById('borrowDate').value = fmtDate(today);
  
  // Set minimum (today) and maximum (7 days) limits for date input
  const dueInput = document.getElementById('borrowDue');
  dueInput.value = fmtDate(maxDue); // Default set to 7 days
  dueInput.min = fmtDate(today);    // Cannot select past dates
  dueInput.max = fmtDate(maxDue);   // Cannot select more than 7 days

  const modal = new bootstrap.Modal(document.getElementById('borrowModal'));
  modal.show();
}

document.getElementById('borrowForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const bookId = parseInt(document.getElementById('borrowBookId').value);
  const memberName = document.getElementById('borrowMember').value.trim();
  const dueDateStr = document.getElementById('borrowDue').value;
  
  if (!memberName) {
    alert('Please enter the borrower\'s name.');
    return;
  }

  if (!dueDateStr) {
    alert('Please select a Due Date.');
    return;
  }

  // Double-check validation to ensure it's not more than 7 days
  const today = new Date(); today.setHours(0,0,0,0);
  const chosenDue = new Date(dueDateStr); chosenDue.setHours(0,0,0,0);
  
  const diffTime = chosenDue.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  if (diffDays < 0) {
    alert('Due date cannot be in the past.');
    return;
  }
  if (diffDays > 7) {
    alert('Due date exceeds the maximum limit of 7 days!');
    return;
  }

  const books = getBooks();
  const book = books.find(b => b.id === bookId);
  if (!book) return;

  book.available = false;
  saveBooks(books);

  const newRecord = {
    id: Date.now(),
    member: memberName,
    book: book.title,
    borrowDate: fmtDate(today),
    dueDate: dueDateStr,
    status: 'Borrowed'
  };

  const existing = getRecords();
  existing.push(newRecord);
  saveRecords(existing);

  const modalEl = document.getElementById('borrowModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();

  setTimeout(() => {
    alert(`✅ "${book.title}" successfully borrowed by ${memberName}!\nDue date: ${dueDateStr} (${diffDays} days)`);
    renderBooks();
  }, 300);
});

function getRecords() { return JSON.parse(localStorage.getItem('bh_records') || '[]'); }
function saveRecords(records) { localStorage.setItem('bh_records', JSON.stringify(records)); }

function returnBook(id) {
  const books = getBooks();
  const book = books.find(b => b.id === id);
  if (!book) return;
  if (!confirm(`Confirm return of "${book.title}"?`)) return;

  book.available = true;
  saveBooks(books);

  const records = getRecords();
  const activeRec = records.filter(r => r.book === book.title && r.status !== 'Returned').sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate))[0];
  if (activeRec) {
    activeRec.status = 'Returned';
    activeRec.returnDate = fmtDate(new Date());
    saveRecords(records);
  }

  alert(`✅ "${book.title}" has been returned.`);
  renderBooks();
}

document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.category-btn').forEach(b => { b.classList.remove('active'); });
    btn.classList.add('active');
    activeCategory = btn.dataset.category; 
    currentPage = 1; 
    renderBooks();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', () => {
    currentPage = 1; 
    renderBooks();
  });
}

renderBooks();