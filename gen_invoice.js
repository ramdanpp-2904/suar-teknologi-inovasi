const fs = require("fs");

const logoB64 = fs.readFileSync("D:/Personal Project/Suar Teknologi Inovasi/logo_b64.txt", "utf-8").trim();

const invoiceNo = "INV-STI-2026-001";
const date = "15 Mei 2026";
const dueDate = "30 Mei 2026";

const items = [
  { no: 1, desc: "Registrasi Domain (per tahun)",             qty: 1, unit: "Tahun",  price: 200000 },
  { no: 2, desc: "Hosting Server Aplikasi (per tahun)",       qty: 1, unit: "Tahun",  price: 300000 },
  { no: 3, desc: "Hosting Server Database (per tahun)",       qty: 1, unit: "Tahun",  price: 300000 },
  { no: 4, desc: "Pengembangan Aplikasi Koperasi Online",     qty: 1, unit: "Paket",  price: 4000000 },
  { no: 5, desc: "Maintenance (per tahun)",                   qty: 1, unit: "Tahun",  price: 200000 },
];

const total = items.reduce((s, i) => s + i.price * i.qty, 0);
const fmt = n => "Rp " + n.toLocaleString("id-ID");

const rows = items.map(i => `
  <tr>
    <td class="center">${i.no}</td>
    <td>${i.desc}</td>
    <td class="center">${i.qty}</td>
    <td class="center">${i.unit}</td>
    <td class="right">${fmt(i.price)}</td>
    <td class="right">${fmt(i.price * i.qty)}</td>
  </tr>`).join("");

const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Invoice ${invoiceNo}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; background: #fff; padding: 40px; font-size: 13px; }
  .wrap { max-width: 820px; margin: 0 auto; }

  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 36px; }
  .logo img { height: 140px; object-fit: contain; }
  .invoice-title { text-align: right; }
  .invoice-title h1 { font-size: 36px; font-weight: 800; color: #1a237e; letter-spacing: 3px; }
  .invoice-title .no { color: #666; font-size: 12px; margin-top: 4px; }
  .badge { display: inline-block; background: #e3f2fd; color: #1565c0; padding: 3px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-top: 8px; letter-spacing: 1px; }

  .divider { height: 4px; background: linear-gradient(90deg, #1a237e 0%, #42a5f5 50%, #ff8f00 100%); border-radius: 2px; margin-bottom: 32px; }

  .billing { display: flex; justify-content: space-between; margin-bottom: 32px; gap: 16px; }
  .billing-block h4 { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #aaa; margin-bottom: 8px; border-bottom: 1px solid #f0f0f0; padding-bottom: 4px; }
  .billing-block strong { display: block; font-size: 14px; color: #1a237e; margin-bottom: 4px; }
  .billing-block p { font-size: 12px; color: #555; line-height: 1.8; }
  .meta { text-align: right; }
  .meta-row { display: flex; justify-content: flex-end; gap: 20px; margin-bottom: 6px; }
  .meta-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #aaa; padding-top: 2px; }
  .meta-value { font-weight: 600; color: #1a1a2e; font-size: 13px; min-width: 130px; text-align: right; }

  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  thead tr { background: #4a6fa5; color: #fff; }
  thead th { padding: 13px 14px; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
  thead th.center { text-align: center; }
  thead th.right { text-align: right; }
  tbody tr { border-bottom: 1px solid #f5f5f5; transition: background 0.1s; }
  tbody tr:nth-child(even) { background: #fafbff; }
  tbody td { padding: 13px 14px; }
  td.center { text-align: center; color: #666; }
  td.right { text-align: right; font-weight: 500; color: #333; }

  .totals { display: flex; justify-content: flex-end; margin-bottom: 32px; }
  .totals-inner { width: 280px; border: 1px solid #e8eaf6; border-radius: 8px; overflow: hidden; }
  .totals-inner .row { display: flex; justify-content: space-between; padding: 10px 16px; font-size: 12px; color: #555; border-bottom: 1px solid #f0f0f0; }
  .totals-inner .row.grand { background: #1a237e; color: #fff; font-size: 15px; font-weight: 700; padding: 14px 16px; border: none; }

  .notes { background: #f8f9ff; border-left: 4px solid #1a237e; padding: 14px 18px; border-radius: 0 6px 6px 0; margin-bottom: 28px; }
  .notes h4 { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #1a237e; margin-bottom: 8px; }
  .notes p { font-size: 12px; color: #555; line-height: 1.9; }

  .payment { display: flex; gap: 16px; margin-bottom: 40px; }
  .payment-block { flex: 1; border: 1px solid #ffe082; background: #fffde7; border-radius: 8px; padding: 16px 18px; }
  .payment-block h4 { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #e65100; margin-bottom: 10px; }
  .payment-block p { font-size: 12px; color: #333; line-height: 1.9; }

  .footer { text-align: center; border-top: 1px solid #eee; padding-top: 20px; color: #bbb; font-size: 11px; }
  .footer strong { color: #1a237e; }

  @media print { body { padding: 20px; } }
</style>
</head>
<body>
<div class="wrap">

  <div class="header">
    <div class="logo">
      <img src="data:image/png;base64,${logoB64}" alt="Suar Teknologi Inovasi" />
    </div>
    <div class="invoice-title">
      <h1>INVOICE</h1>
      <div class="no">No. ${invoiceNo}</div>
      <span class="badge">TAGIHAN</span>
    </div>
  </div>

  <div class="divider"></div>

  <div class="billing">
    <div class="billing-block">
      <h4>Kepada</h4>
      <strong>Koperasi Jasa Karyawan Jayasraya</strong>
      <p>Sentral Senayan I, Jl. Asia Afrika No.8 1,<br>RT.1/RW.3, Gelora, Tanah Abang,<br>Jakarta Pusat, DKI Jakarta 10270</p>
    </div>
    <div class="billing-block meta">
      <h4>Detail Invoice</h4>
      <div class="meta-row">
        <span class="meta-label">Tanggal</span>
        <span class="meta-value">${date}</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Jatuh Tempo</span>
        <span class="meta-value">${dueDate}</span>
      </div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width:40px" class="center">No</th>
        <th>Deskripsi Layanan</th>
        <th style="width:50px" class="center">Qty</th>
        <th style="width:70px" class="center">Satuan</th>
        <th style="width:140px" class="right">Harga Satuan</th>
        <th style="width:140px" class="right">Jumlah</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <div class="totals">
    <div class="totals-inner">
      <div class="row grand">
        <span>TOTAL</span>
        <span>${fmt(total)}</span>
      </div>
    </div>
  </div>

  <div class="notes">
    <h4>Catatan</h4>
    <p>
      • Biaya domain dan hosting bersifat tahunan dan akan ditagihkan kembali setiap tahun.<br>
      • Pengembangan aplikasi mencakup fitur lengkap sistem Koperasi Online (Kokarja) termasuk deployment.<br>
      • Maintenance (per tahun) mencakup perbaikan bug dan pembaruan keamanan.
    </p>
  </div>

  <div class="payment">
    <div class="payment-block">
      <h4>Informasi Pembayaran</h4>
      <p>
        <strong>Bank BCA</strong><br>
        No. Rekening: <strong>0384388350</strong><br>
        Atas Nama: <strong>Ramdan Pratama Putra</strong>
      </p>
    </div>
  </div>

  <div class="footer">
    <p>Terima kasih telah mempercayakan pengembangan aplikasi kepada <strong>Suar Teknologi Inovasi</strong>.</p>
    <p style="margin-top: 4px;">Dokumen ini dibuat secara digital dan sah tanpa tanda tangan basah.</p>
  </div>

</div>
</body>
</html>`;

fs.writeFileSync("D:/Personal Project/Suar Teknologi Inovasi/invoice-INV-STI-2026-001.html", html, "utf-8");
console.log("Invoice created: invoice-INV-STI-2026-001.html");
