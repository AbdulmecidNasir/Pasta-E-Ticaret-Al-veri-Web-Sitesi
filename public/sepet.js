const sepetDiv = document.getElementById("sepet-urunler");

// Sepet ürünlerini listeleme
fetch("/sepet")
  .then((response) => response.json())
  .then((urunler) => {
    urunler.forEach((urun) => {
      const urunDiv = document.createElement("div");
      urunDiv.classList.add("urun");

      urunDiv.innerHTML = `
        <img src="${urun.UrunFotografi}" alt="${urun.UrunAdi}">
        <div>
          <h3>${urun.UrunAdi}</h3>
          <p>${urun.UrunFiyati} TL</p>
        </div>
        <button onclick="urunSil('${urun._id}')">Ürünü Sil</button>
      `;
      sepetDiv.appendChild(urunDiv);
    });
  });

// Ürün silme fonksiyonu
function urunSil(id) {
  fetch(`/sepet/sil/${id}`, { method: "DELETE" })
    .then(() => location.reload())
    .catch((err) => console.error("Ürün silinirken hata oluştu: ", err));
}

// Alışverişi Tamamla
document.getElementById("alisveris-tamamla").addEventListener("click", () => {
  fetch("/sepet/tamamla", { method: "POST" })
    .then(() => alert("Alışverişiniz tamamlandı!"))
    .then(() => location.reload())
    .catch((err) => console.error("Alışveriş tamamlanırken hata oluştu: ", err));
});
