// Ambil elemen form dan elemen hasil
const form = document.getElementById('kasirForm');
const hasil = document.getElementById('hasil');

// Elemen error message
const errorNama = document.getElementById('errorNama');
const errorHarga = document.getElementById('errorHarga');
const errorJumlah = document.getElementById('errorJumlah');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Cegah reload halaman

  // Reset pesan error
  errorNama.textContent = '';
  errorHarga.textContent = '';
  errorJumlah.textContent = '';
  hasil.textContent = '';

  // Ambil nilai input dan trim
  const nama = form.namaBarang.value.trim();
  const harga = Number(form.hargaSatuan.value);
  const jumlah = Number(form.jumlah.value);

  let valid = true;

  // Validasi nama barang
  if (nama.length === 0) {
    errorNama.textContent = 'Nama barang wajib diisi.';
    valid = false;
  }

  // Validasi harga satuan
  if (!harga || harga < 1) {
    errorHarga.textContent = 'Harga satuan harus angka positif.';
    valid = false;
  }

  // Validasi jumlah
  if (!jumlah || jumlah < 1) {
    errorJumlah.textContent = 'Jumlah barang harus angka positif.';
    valid = false;
  }

  if (!valid) return;

  // Hitung total harga
  const total = harga * jumlah;

  // Tampilkan hasil dengan format angka Indonesia
  hasil.textContent = `Total harga ${nama} (${jumlah} pcs) adalah Rp ${total.toLocaleString('id-ID')}`;
});
