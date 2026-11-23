/* ============================================
   dashboard.js — Real Data & Category Based
   ============================================ */

window.onload = function() {
  const sessionData = sessionStorage.getItem('bh_user');
  const welcomeEl = document.getElementById('welcomeName');
  if (welcomeEl) welcomeEl.textContent = sessionData || 'Admin';

  // 1. Ambil data buku dan rekod sebenar dari localStorage
  let books = JSON.parse(localStorage.getItem('bh_books')) || [];
  let records = [];
  
  try { 
    records = JSON.parse(localStorage.getItem('bh_records') || '[]'); 
  } catch(e) {
    records = [];
  }

  // Jika tiada buku (localStorage kosong), fallback ke senarai asas supaya tak error
  if (books.length === 0) {
    books = [
      { title: 'Andai Itu Takdirnya', category: 'Malaysia', available: true },
      { title: 'The Great Gatsby', category: 'Fiction', available: true },
      { title: 'Sapiens', category: 'History', available: true },
      { title: 'Clean Code', category: 'Technology', available: true },
      { title: 'The Hobbit', category: 'Fantasy', available: true },
      { title: 'Gone Girl', category: 'Thriller', available: true },
      { title: 'Pride and Prejudice', category: 'Romance', available: true },
      { title: 'Cosmos', category: 'Science', available: true }
    ];
  }

  // 2. Kira Statistik Utama (Stat Cards)
  const totalBooks = books.length;
  
  // Currently Borrowed = Buku yang status 'available' adalah false
  const borrowedCount = books.filter(b => b.available === false).length;
  
  // Available = Buku yang status 'available' adalah true
  const availableCount = books.filter(b => b.available === true).length;

  // Overdue = Kira berdasarkan rekod yang lewat
  const today = new Date(); today.setHours(0,0,0,0);
  let overdueCount = 0;
  records.forEach(r => {
    if (r.status !== 'Returned') {
      const due = new Date(r.dueDate); due.setHours(0,0,0,0);
      if (due < today) overdueCount++;
    }
  });

  document.getElementById('statTotalBooks').textContent = totalBooks;
  document.getElementById('statBorrowed').textContent = borrowedCount;
  document.getElementById('statAvailable').textContent = availableCount;
  document.getElementById('statOverdue').textContent = overdueCount; 

  // 3. BAR CHART (Borrowings Per Month)
  const barCtx = document.getElementById('borrowChart');
  if (barCtx) {
    const monthData = [0, 0, 0, 0, 0, 0];
    const labels = [];
    const d = new Date();
    
    // Jana label untuk 6 bulan terakhir
    for (let i = 5; i >= 0; i--) {
        const month = new Date(d.getFullYear(), d.getMonth() - i, 1);
        labels.push(month.toLocaleString('en-US', { month: 'short' }));
    }

    // Kira bilangan pinjaman berdasarkan bulan
    records.forEach(r => {
      if (!r.borrowDate) return;
      const rDate = new Date(r.borrowDate);
      const diffMonths = (d.getFullYear() - rDate.getFullYear()) * 12 + (d.getMonth() - rDate.getMonth());
      
      // Jika pinjaman berlaku dalam 6 bulan terakhir
      if (diffMonths >= 0 && diffMonths < 6) {
        monthData[5 - diffMonths]++; 
      }
    });

    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Books Borrowed',
          data: monthData,
          backgroundColor: '#0d6efd',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { 
          y: { 
            beginAtZero: true, 
            ticks: { stepSize: 1 } 
          }, 
          x: { grid: { display: false } } 
        }
      }
    });
  }

  // 4. DOUGHNUT CHART (Books by Category) - BERDASARKAN KATALOG BUKU
  const pieCtx = document.getElementById('categoryChart');
  if (pieCtx) {
    const categoryCounts = {};
    
    // Kira berapa banyak buku untuk setiap kategori dalam katalog
    books.forEach(b => {
      const cat = b.category || 'Lain-lain';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    // Jika betul-betul tiada data
    if (Object.keys(categoryCounts).length === 0) {
        categoryCounts['No Data'] = 1;
    }

    // Susun kategori dari yang paling banyak ke paling sedikit
    const sortedCategories = Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a]);
    const sortedData = sortedCategories.map(cat => categoryCounts[cat]);

    // Warna-warna cantik mengikut kategori
    const bgColors = [
      '#0d6efd', // Biru
      '#dc3545', // Merah
      '#ffc107', // Kuning
      '#6c5ce7', // Ungu
      '#198754', // Hijau
      '#fd7e14', // Oren
      '#0dcaf0', // Cyan
      '#20c997', // Teal
      '#6c757d', // Kelabu
      '#d63384', // Pink
      '#8b5a4a'  // Coklat
    ];

    new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: sortedCategories,
        datasets: [{
          data: sortedData,
          backgroundColor: bgColors,
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
          legend: { 
            position: 'bottom', 
            labels: { 
              boxWidth: 12,
              font: { size: 11 }
            } 
          } 
        },
        cutout: '65%'
      }
    });
  }
};