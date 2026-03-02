# E-Ticaret Uygulaması (Angular + Nx)

Bu repo, kullanıcı (UI) ve yönetim (Admin) panelleri olan bir E-Ticaret uygulamasıdır.

> Projedeki tüm geliştirmelerin adım adım geçmişi için: [PROJE-GUNLUGU.md](./PROJE-GUNLUGU.md)

## Proje Özeti

- Monorepo altyapısı: **Nx**
- Frontend: **Angular (standalone yapı)**
- Veri kaynağı: **json-server (`db.json`)**
- Uygulamalar:
	- `apps/ui`: müşteri tarafı
	- `apps/admin`: yönetim paneli
- Paylaşılan katman:
	- `library/shared`: model/interceptor/ortak yapılar

## Öne Çıkan Özellikler

### UI (Müşteri)
- Kayıt / giriş (auth akışı)
- Kategoriye göre ürün listeleme
- Dinamik kategori başlığı (`Ürünler`, `Telefonlar`, `Bilgisayarlar`...)
- Sepet yönetimi (ekleme, adet güncelleme, toplamlar)
- Ödeme akışı ve sipariş oluşturma
- Siparişlerim + sipariş detay ekranı
- Loading ve boş durum yönetimleri

### Admin (Yönetim)
- Ürün / kategori / kullanıcı yönetimi
- Sipariş yönetim ekranları (liste + detay)
- Sipariş durum operasyonları:
	- Onayla (`Hazırlanıyor`)
	- Kargoya Ver (`Kargoda`)
	- Teslim Et (`Teslim Edildi`)
	- İptal Et (`İptal Edildi`)
- Durum geçiş iş kuralları (geçersiz geçişleri engelleme)
- Dashboard metrikleri:
	- Son Siparişler
	- Son Aktiviteler
	- En İyi Müşteriler

## Teknik Detaylar

- HTTP çağrıları: `httpResource` ve `HttpClient`
- Global endpoint / error yönetimi: `library/shared/interceptors`
- Modeller: `library/shared/src/models`
- Mock API verisi: [db.json](./db.json)

## Kurulum

```bash
npm install
```

## Çalıştırma

### 1) json-server
`package.json` içindeki script’e göre çalıştırın (örnek):

```bash
npm run server
```

> Not: Script adı farklıysa `package.json` içinden kontrol edebilirsiniz.

### 2) UI uygulaması

```bash
npx nx serve ui
```

### 3) Admin uygulaması

```bash
npx nx serve admin
```

## Build

```bash
npx nx build ui
npx nx build admin
```

## Proje Günlükleri

Bu projede yapılan geliştirmeler commit mantığıyla düzenli olarak günlüklenmiştir:

- [PROJE-GUNLUGU.md](./PROJE-GUNLUGU.md)

Bu dosya; hangi tarihte hangi modülde ne değişti, hangi dosyalar etkilendi ve hangi teknik kararların alındığını içerir.

## Ekran Görüntüleri ve Sertifika

Bu bölüm paylaşım amaçlı bırakılmıştır. Görselleri ilgili klasöre ekleyip linkleyebilirsiniz.

- `docs/screenshots/ui-home.png`
- `docs/screenshots/ui-orders.png`
- `docs/screenshots/admin-dashboard.png`
- `docs/screenshots/admin-orders.png`
- `docs/screenshots/certificate.png`

## Eğitim Notu

Bu proje, **Udemy’de Taner Saydam hocamızın eğitimi** ile geliştirilerek tamamlanmıştır.

