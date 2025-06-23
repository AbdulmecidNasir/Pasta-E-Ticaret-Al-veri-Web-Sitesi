import mongoose from "mongoose";

// MongoDB bağlantısı
const conn = () => {
  mongoose
    .connect("mongodb+srv://abdulmecidNasir:alfadbconnect@nodeblog.e6rtf.mongodb.net/node-blog")
    .then(() => {
      console.log("MongoDB Veri Tabanına Başarılı Bir Şekilde Bağlantısı Kuruldu!");
    })
    .catch((err) => {
      console.log("MongoDB bağlantısı hatası: ", err);
    });
};

// MusterilerKayitTbl koleksiyonu için schema (model) tanımlaması
const musteriSchema = new mongoose.Schema({
  Ad: {
    type: String,
    required: true,
    maxlength: 100,
  },
  Soyad: {
    type: String,
    required: true,
    maxlength: 100,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
  Sifre: {
    type: String,
    required: true,
    maxlength: 100,
  },
});

// Musteriler modelini oluşturma
const Musteri = mongoose.model("MusterilerKayitTbl", musteriSchema);

// SepeturunlerTbl koleksiyonu için schema (model) tanımlaması
const sepetSchema = new mongoose.Schema({
  UrunAdi: { type: String, required: true },
  UrunFiyati: { type: Number, required: true },
  UrunFotografi: { type: String, required: true },
});

// Sepet modelini oluşturma
const SepetUrun = mongoose.model("SepeturunlerTbl", sepetSchema);

// Tüm dışa aktarmalar
export { conn, Musteri, SepetUrun };
