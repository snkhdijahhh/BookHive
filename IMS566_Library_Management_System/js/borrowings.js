/* ============================================
   borrowings.js — Auto-detect overdue & Sync
   ============================================ */

function getRecords() {
  return JSON.parse(localStorage.getItem('bh_records') || '[]');
}
function saveRecords(r) {
  localStorage.setItem('bh_records', JSON.stringify(r));
}

function formatDate(dateStr) {
  if (!dateStr || dateStr === '-') return '-';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '-';
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function computeStatus(r) {
  if (r.status === 'Returned') return 'Returned';
  const today = new Date(); today.setHours(0,0,0,0);
  const due = new Date(r.dueDate); due.setHours(0,0,0,0);
  if (due < today) return 'Overdue';
  return 'Borrowed';
}

let activeFilter = 'all';

function renderBorrowings() {
  const tbody = document.getElementById('borrowBody');
  const recordCount = document.getElementById('recordCount');
  if (!tbody) return;

  const records = getRecords();

  let changed = false;
  records.forEach(r => {
    if (r.status !== 'Returned') {
      const computed = computeStatus(r);
      if (r.status !== computed) { r.status = computed; changed = true; }
    }
  });
  if (changed) saveRecords(records);

  const filtered = records.filter(r => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return computeStatus(r) === 'Borrowed';
    if (activeFilter === 'overdue') return computeStatus(r) === 'Overdue';
    if (activeFilter === 'returned') return computeStatus(r) === 'Returned';
    return true;
  });

  if (recordCount) recordCount.textContent = filtered.length;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-5"><i class="bi bi-inbox fs-2 d-block mb-2"></i>No records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((r, i) => {
    const realStatus = computeStatus(r);
    
    // Badge Styling
    let badge = '';
    if (realStatus === 'Returned') {
      badge = `<span class="badge badge-vintage-returned"><i class="bi bi-check-circle-fill me-1"></i>Returned</span>`;
    } else if (realStatus === 'Overdue') {
      badge = `<span class="badge badge-vintage-overdue"><i class="bi bi-exclamation-triangle-fill me-1"></i>Overdue</span>`;
    } else {
      badge = `<span class="badge badge-vintage-borrowed"><i class="bi bi-hourglass-split me-1"></i>Borrowed</span>`;
    }

    // Calculate days remaining
    let daysLeft = '';
    if (realStatus === 'Borrowed') {
      const diff = Math.ceil((new Date(r.dueDate) - new Date()) / (1000*60*60*24));
      if(diff >= 0) daysLeft = `<div class="small text-muted mt-1">(${diff} days left)</div>`;
    } else if (realStatus === 'Overdue') {
      const diff = Math.ceil((new Date() - new Date(r.dueDate)) / (1000*60*60*24));
      daysLeft = `<div class="small text-danger mt-1">(${diff} days overdue)</div>`;
    }

    // Action Button
    const actionBtn = realStatus !== 'Returned'
      ? `<button class="btn btn-sm btn-return-action return-row-btn" data-id="${r.id}"><i class="bi bi-arrow-return-left me-1"></i> Return</button>`
      : `<span class="text-muted small">—</span>`;

    return `
      <tr>
        <td class="text-muted">${i + 1}</td>
        <td><i class="bi bi-person me-2 text-muted"></i>${r.member}</td>
        <td class="fw-bold text-dark">${r.book}</td>
        <td>${formatDate(r.borrowDate)}</td>
        <td>
          ${formatDate(r.dueDate)} 
          ${daysLeft}
        </td>
        <td>${badge}</td>
        <td class="text-end">${actionBtn}</td>
      </tr>`;
  }).join('');

  attachReturnHandlers();
}

function attachReturnHandlers() {
  document.querySelectorAll('.return-row-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const records = getRecords();
      const rec = records.find(r => r.id === id);
      if (!rec) return;
      if (!confirm(`Confirm return of "${rec.book}" by ${rec.member}?`)) return;

      rec.status = 'Returned';
      rec.returnDate = new Date().toISOString().split('T')[0];
      saveRecords(records);

      const books = JSON.parse(localStorage.getItem('bh_books') || '[]');
      const book = books.find(b => b.title === rec.book);
      if (book) {
        book.available = true;
        localStorage.setItem('bh_books', JSON.stringify(books));
      }

      renderBorrowings();
    });
  });
}

// Filter logic
document.querySelectorAll('#filterGroup button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#filterGroup button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderBorrowings();
  });
});

renderBorrowings();