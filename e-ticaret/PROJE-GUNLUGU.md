# Proje Günlüğü

Bu dosya, projede yapılan işleri adım adım takip etmek içindir.
`README` sade kalır, proje geçmişi burada birikir.

## Kullanım Kuralı

Her commit atmadan **önce**, aşağıdaki şablonu bu dosyanın en üstüne yeni bir madde olarak ekle:

```md
## [YYYY-MM-DD] Kısa Başlık
- Commit: <hash veya geçici>
- Kapsam: <hangi ekran/feature>
- Etkilenen Dosyalar:
  - <dosya-yolu-1>
  - <dosya-yolu-2>
- Yapılanlar:
  - ...
  - ...
- Not: <opsiyonel teknik not>
```

---

## Geçmiş (Başlangıçtan Bugüne)

## [2026-02-23] Proje ilk kurulum
- Commit: `82c82a5`
- Kapsam: Başlangıç altyapısı
- Etkilenen Dosyalar:
  - `.editorconfig`
  - `.github/workflows/ci.yml`
  - `.gitignore`
  - `.prettierignore`
  - `.prettierrc`
  - `.vscode/extensions.json`
  - `README.md`
  - `apps/admin/eslint.config.mjs`
  - `apps/admin/project.json`
  - `apps/admin/public/favicon.ico`
  - `apps/admin/src/app/app.config.ts`
  - `apps/admin/src/app/app.css`
  - `apps/admin/src/app/app.html`
  - `apps/admin/src/app/app.routes.ts`
  - `apps/admin/src/app/app.ts`
  - `apps/admin/src/app/nx-welcome.ts`
  - `apps/admin/src/index.html`
  - `apps/admin/src/main.ts`
  - `apps/admin/src/styles.css`
  - `apps/admin/tsconfig.app.json`
  - `apps/admin/tsconfig.json`
  - `eslint.config.mjs`
  - `nx.json`
  - `package-lock.json`
  - `package.json`
  - `tsconfig.base.json`
- Yapılanlar:
  - Nx tabanlı Angular workspace ilk kez oluşturuldu.
  - `admin` uygulaması için temel giriş dosyaları, route altyapısı ve global stiller üretildi.
  - Lint/format, TypeScript ve CI temel yapı taşları projeye eklendi.
  - Paket yönetimi dosyaları (`package.json`, `package-lock.json`) ile bağımlılıklar sabitlendi.

## [2026-02-23] Temizlik ve temel hazırlık
- Commit: `04d2b28`
- Kapsam: Proje yapısı
- Etkilenen Dosyalar:
  - `apps/admin/src/app.config.ts`
  - `apps/admin/src/app.routes.ts`
  - `apps/admin/src/app.ts`
  - `apps/admin/src/app/app.css`
  - `apps/admin/src/app/app.html`
  - `apps/admin/src/app/app.routes.ts`
  - `apps/admin/src/app/app.ts`
  - `apps/admin/src/app/nx-welcome.ts`
  - `apps/admin/src/index.html`
  - `apps/admin/src/main.ts`
  - `apps/admin/src/pages/home/home.html`
  - `apps/admin/src/pages/home/home.ts`
  - `apps/admin/src/pages/layouts/layouts.html`
  - `apps/admin/src/pages/layouts/layouts.ts`
  - `apps/admin/src/pages/login/login.html`
  - `apps/admin/src/pages/login/login.ts`
  - `nx.json`
  - `package-lock.json`
- Yapılanlar:
  - Varsayılan başlangıç içerikleri sadeleştirildi, proje domain yapısına uygun dosyalar öne çıkarıldı.
  - `home`, `login` ve `layouts` sayfa iskeletleri oluşturularak yönlendirme akışına hazırlandı.
  - Uygulama giriş noktaları (`main.ts`, `index.html`) ve app bootstrap yapısı toparlandı.
  - Çalışma alanı yapılandırmalarında (`nx.json`) temel düzenlemeler yapıldı.

## [2026-02-23] Admin tema layout entegrasyonu
- Commit: `077b014`
- Kapsam: Admin arayüz yerleşimi
- Etkilenen Dosyalar:
  - `apps/admin/src/index.html`
  - `apps/admin/src/main.ts`
  - `apps/admin/src/pages/layouts/breadcrumb.ts`
  - `apps/admin/src/pages/layouts/layouts.html`
  - `apps/admin/src/pages/layouts/layouts.ts`
  - `apps/admin/src/styles.css`
- Yapılanlar:
  - Admin temanın ana layout kurgusu Angular component yapısına taşındı.
  - `layouts` ekranı üzerinden sayfa kabuğu (header/sidebar/content) bütünlüğü kuruldu.
  - Breadcrumb bileşeni için temel dosya/bağlantı altyapısı eklendi.
  - Global stiller tema ile uyumlu olacak şekilde güncellendi.

## [2026-02-23] Sidebar düzenlemeleri
- Commit: `42b383f`
- Kapsam: Layout / Sidebar
- Etkilenen Dosyalar:
  - `apps/admin/src/navigation.ts`
  - `apps/admin/src/pages/layouts/layouts.html`
  - `apps/admin/src/pages/layouts/layouts.ts`
  - `apps/admin/src/pipes/nav-pipe.ts`
- Yapılanlar:
  - Sidebar menü verileri `navigation.ts` içinde merkezi hale getirildi.
  - `layouts` içinde sidebar render akışı güncellendi.
  - Menü verisini filtrelemek/işlemek için `nav-pipe.ts` hattı eklendi.
  - Sidebar görünümü ve kullanım akışı daha okunur hale getirildi.

## [2026-02-23] Footer düzenlemeleri
- Commit: `db7efec`
- Kapsam: Layout / Footer
- Etkilenen Dosyalar:
  - `apps/admin/src/app.config.ts`
  - `apps/admin/src/main.ts`
  - `apps/admin/src/pages/layouts/layouts.html`
  - `apps/admin/src/pages/layouts/layouts.ts`
- Yapılanlar:
  - Layout içindeki footer bölümünün konumu ve yapısı düzenlendi.
  - Uygulama başlangıç/config dosyalarında footer entegrasyonunu destekleyen düzenlemeler yapıldı.
  - `layouts` şablonunda footer görünümü daha tutarlı hale getirildi.

## [2026-02-23] Content alanı düzenlemeleri
- Commit: `2eb0d7f`
- Kapsam: Layout / Content
- Etkilenen Dosyalar:
  - `apps/admin/src/pages/home/home.html`
  - `apps/admin/src/pages/layouts/layouts.html`
  - `apps/admin/src/pages/layouts/layouts.ts`
- Yapılanlar:
  - Ana içerik alanının layout içindeki yerleşimi netleştirildi.
  - `home` sayfası ile content alanı ilişkisi düzenlendi.
  - Sayfa gövdesi ve ana şablon arasında daha temiz bir içerik akışı sağlandı.

## [2026-02-24] Başlık ve breadcrumb yönetimi
- Commit: `9131cdd`
- Kapsam: Navigasyon
- Etkilenen Dosyalar:
  - `apps/admin/src/components/blank.ts`
  - `apps/admin/src/pages/home/home.html`
  - `apps/admin/src/pages/home/home.ts`
  - `apps/admin/src/pages/layouts/breadcrumb.ts`
  - `apps/admin/src/services/common.ts`
- Yapılanlar:
  - Sayfa başlıklarının merkezi yönetimi iyileştirildi.
  - Breadcrumb üretim mantığı daha kolay kullanılabilir hale getirildi.
  - `common` servis üzerinden ortak bilgi taşıma/erişim akışı güçlendirildi.
  - `home` ve `blank` tarafında breadcrumb-title akışına uyumlu düzenlemeler yapıldı.

## [2026-02-24] JSON server ayağa kaldırma
- Commit: `7bdd981`
- Kapsam: Geliştirme altyapısı
- Etkilenen Dosyalar:
  - `db.json`
- Yapılanlar:
  - Geliştirme ortamı için mock veri kaynağı olarak `db.json` dosyası eklendi.
  - JSON server ile yerel API akışını ayağa kaldırmak için temel veri yapısı hazırlandı.

## [2026-02-24] Products sayfası ve listeleme altyapısı
- Commit: `7f90609`
- Kapsam: Ürün listeleme ekranı
- Etkilenen Dosyalar:
  - `PROJE-GUNLUGU.md`
  - `README.md`
  - `apps/admin/src/app.config.ts`
  - `apps/admin/src/app.routes.ts`
  - `apps/admin/src/navigation.ts`
  - `apps/admin/src/pages/layouts/breadcrumb.ts`
  - `apps/admin/src/pages/products/products.html`
  - `apps/admin/src/pages/products/products.ts`
  - `apps/admin/src/services/common.ts`
  - `package-lock.json`
  - `package.json`
- Yapılanlar:
  - Admin paneline `products` sayfası eklendi ve route akışına bağlandı.
  - Ürün listesinin arayüzde tablo/grid yapısında görüntülenmesi sağlandı.
  - Navigasyon ve breadcrumb tarafı ürün sayfasını kapsayacak şekilde güncellendi.
  - Sayfa için gereken servis/bağımlılık düzenlemeleri yapıldı.

## [2026-02-24] Ürün listesine kategori ve API entegrasyonu
- Commit: `7e96bf6`
- Kapsam: Products veri kaynağı
- Etkilenen Dosyalar:
  - `db.json`
  - `apps/admin/src/pages/products/products.html`
  - `apps/admin/src/pages/products/products.ts`
- Yapılanlar:
  - Ürün modeline kategori bilgisi eklendi.
  - Products ekranındaki listeleme mock dosya/API kaynağından veri okuyacak şekilde düzenlendi.
  - Liste şablonu kategori bilgisini gösterecek şekilde güncellendi.

## [2026-02-24] Product create sayfası ve ürün ekleme akışı
- Commit: `ba645b7`
- Kapsam: Ürün oluşturma
- Etkilenen Dosyalar:
  - `apps/admin/src/app.routes.ts`
  - `apps/admin/src/pages/products/create/create.html`
  - `apps/admin/src/pages/products/create/create.ts`
  - `apps/admin/src/pages/products/products.html`
  - `apps/admin/src/pages/products/products.ts`
  - `db.json`
- Yapılanlar:
  - `products/create` sayfası oluşturuldu ve route’a eklendi.
  - Ürün ekleme formu ve temel submit akışı tanımlandı.
  - Ürün listesi ekranı create akışıyla uyumlu hale getirildi.
  - Mock veri dosyası yeni ürün ekleme senaryosunu destekleyecek şekilde güncellendi.
