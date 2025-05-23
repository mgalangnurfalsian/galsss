const formBarang = document.getElementById('formBarang');
const tbody = document.querySelector('#tabelKeranjang tbody');
const totalBayarEl = document.getElementById('totalBayar');
const btnBayar = document.getElementById('btnBayar');

let keranjang = [];

function renderKeranjang() {
  tbody.innerHTML = '';

  if (keranjang.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; font-style:italic; color:#777;">Keranjang kosong</td></tr>`;
    btnBayar.disabled = true;
    updateTotalBayar(0);
    return;
  }

  keranjang.forEach((item, index) => {
    const subtotal = item.harga * item.jumlah;
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.nama}</td>
      <td>${item.harga.toLocaleString('id-ID')}</td>
      <td>${item.jumlah}</td>
      <td>${subtotal.toLocaleString('id-ID')}</td>
      <td><button class="btn-hapus" data-index="${index}">Hapus</button></td>
    `;

    tbody.appendChild(row);
  });

  btnBayar.disabled = false;

  // Hitung total bayar
  const total = keranjang.reduce((acc, cur) => acc + (cur.harga * cur.jumlah), 0);
  updateTotalBayar(total);
}

function updateTotalBayar(total) {
  totalBayarEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

formBarang.addEventListener('submit', function(e) {
  e.preventDefault();

  const nama = document.getElementById('namaBarang').value.trim();
  const harga = parseInt(document.getElementById('hargaSatuan').value);
  const jumlah = parseInt(document.getElementById('jumlah').value);

  if (!nama) {
    alert('Masukkan nama barang!');
    return;
  }
  if (!harga || harga < 1) {
    alert('Harga satuan harus angka positif!');
    return;
  }
  if (!jumlah || jumlah < 1) {
    alert('Jumlah harus angka positif!');
    return;
  }

  // Cek apakah barang sudah ada, jika ada update jumlah
  const index = keranjang.findIndex(item => item.nama.toLowerCase() === nama.toLowerCase());
  if (index !== -1) {
    keranjang[index].jumlah += jumlah;
  } else {
    keranjang.push({ nama, harga, jumlah });
  }

  // Reset form
  formBarang.reset();
  document.getElementById('namaBarang').focus();

  renderKeranjang();
});

// Event delegation untuk tombol hapus
tbody.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-hapus')) {
    const idx = parseInt(e.target.getAttribute('data-index'));
    keranjang.splice(idx, 1);
    renderKeranjang();
  }
});

btnBayar.addEventListener('click', function() {
  if (keranjang.length === 0) {
    alert('Keranjang masih kosong!');
    return;
  }
  const total = keranjang.reduce((acc, cur) => acc + (cur.harga * cur.jumlah), 0);
  alert(`Total bayar Anda: Rp ${total.toLocaleString('id-ID')}\nTerima kasih telah berbelanja!`);

  // Kosongkan keranjang setelah bayar
  keranjang = [];
  renderKeranjang();
});

// Render awal (keranjang kosong)
renderKeranjang();
