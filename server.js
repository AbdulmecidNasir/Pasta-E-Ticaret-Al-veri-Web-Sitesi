import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { conn, Musteri, SepetUrun } from "./db.js";


const app = express();
const port = 3001;


conn();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static dosyaları sunmak için "public" dizinini kullan
app.use(express.static('public'));

// Ana sayfa için rota
app.get("/", (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
});

// Register sayfası için rota
app.get("/register", (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'register.html');
  res.sendFile(filePath);
});

// Login sayfası için rota
app.get("/login", (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'login.html');
  res.sendFile(filePath);
});
app.get("/sepet", (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'sepet.html');
  res.sendFile(filePath);
});

app.post("/register", async (req, res) => {
  const { ad, soyad, email, sifre } = req.body;

  // Yeni müşteri oluşturuyoruz
  const yeniMusteri = new Musteri({
    Ad: ad,
    Soyad: soyad,
    Email: email,
    Sifre: sifre,
  });

  try {
    await yeniMusteri.save();
    res.send(`
      <h1>Pasta Web Sitesine Verileriniz Başarılı bir Şekilde Kaydedildi!</h1>
      <p><a href='index.html'>Anasayfaya gitmek için tıklayın</a></p>
    `);
  } catch (err) {
    res.status(500).send("Kayıt sırasında bir hata oluştu.");
    console.error(err);
  }
});

// Login işlemi: Email ve şifreyi doğruluyoruz
app.post("/login", async (req, res) => {
  const { email, sifre } = req.body;

  try {
    // Email'e göre kullanıcıyı arıyoruz
    const musteri = await Musteri.findOne({ Email: email });

    if (!musteri) {
      // Kullanıcı bulunmazsa hata mesajı döndürür
      return res.send("<h1>Girdiğiniz email hatalı!</h1><p><a href='login.html'>Tekrar deneyin</a></p>");
    }

    // Şifreyi kontrol ediyoruz
    if (musteri.Sifre !== sifre) {
      // Şifre yanlışsa hata mesajı döndürür
      return res.send("<h1>Girdiğiniz şifre hatalı!</h1><p><a href='login.html'>Tekrar deneyin</a></p>");
    }

    // Giriş başarılı ise mesaj döndürür
    res.send(`
      <h1>Giriş başarılı!</h1>
      <p><a href='index.html'>Anasayfaya gitmek için tıklayın</a></p>
    `);
    

  } catch (err) {
    console.error(err);
    res.status(500).send("<h1>Bir hata oluştu.</h1>");
  }
});

// Sepete ürün ekleme
app.post("/sepet/ekle", async (req, res) => {
  const { UrunAdi, UrunFiyati, UrunFotografi } = req.body;

  try {
    const yeniUrun = new SepetUrun({ UrunAdi, UrunFiyati, UrunFotografi });  // 'SepetUrun' kullanıldı
    await yeniUrun.save();
    res.send("Ürün sepete eklendi.");
  } catch (error) {
    res.status(500).send("Sepete ürün eklenemedi.");
  }
});

// Sepetteki ürünleri listeleme
app.get("/sepet", async (req, res) => {
  try {
    const sepetUrunleri = await SepetUrun.find();  // 'SepetUrun' kullanıldı
    res.json(sepetUrunleri);
  } catch (error) {
    res.status(500).send("Sepet ürünleri alınamadı.");
  }
});

// Sepetten ürün silme
app.delete("/sepet/sil/:id", async (req, res) => {
  try {
    const result = await SepetUrun.findByIdAndDelete(req.params.id);
    if (result) {
      res.send("Ürün sepetten silindi.");
    } else {
      res.status(404).send("Ürün bulunamadı.");
    }
  } catch (error) {
    res.status(500).send("Ürün silinemedi.");
  }
});



// Sepeti temizle
app.post("/sepet/tamamla", async (req, res) => {
  try {
    await SepetUrun.deleteMany();
    res.send("Alışverişiniz tamamlandı!");
  } catch (error) {
    res.status(500).send("Alışveriş tamamlanamadı.");
  }
});


// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


