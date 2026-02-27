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

## [2026-02-24] Toast mesajları ve soru akışı
- Commit: `3a612fd`
- Kapsam: Ürün ekranı geri bildirimleri
- Etkilenen Dosyalar:
  - `PROJE-GUNLUGU.md`
  - `apps/admin/src/pages/products/create/create.ts`
  - `apps/admin/src/pages/products/products.html`
  - `apps/admin/src/pages/products/products.ts`
  - `apps/admin/src/styles.css`
  - `package-lock.json`
  - `package.json`
- Yapılanlar:
  - `flexi-toast` ile kullanıcıya bilgilendirme mesajları gösterimi eklendi.
  - Ürün akışlarında soru/geri bildirim etkileşimleri güncellendi.
  - Ekran ve stil tarafında toast kullanımını destekleyen düzenlemeler yapıldı.

## [2026-02-24] Ürün ekleme fiyat alanı maskeleme
- Commit: `3bf3562`
- Kapsam: Ürün oluşturma formu
- Etkilenen Dosyalar:
  - `apps/admin/src/app.config.ts`
  - `apps/admin/src/pages/products/create/create.html`
  - `apps/admin/src/pages/products/create/create.ts`
  - `apps/admin/src/styles.css`
  - `package-lock.json`
  - `package.json`
- Yapılanlar:
  - Ürün ekleme formundaki `price` alanı parasal format için maskelendi.
  - Form bileşeni ve şablonu maske akışına göre güncellendi.
  - Gerekli bağımlılık/config düzenlemeleri projeye işlendi.

## [2026-02-24] Ürün silme işlemi
- Commit: `95354fc`
- Kapsam: Products CRUD
- Etkilenen Dosyalar:
  - `apps/admin/src/pages/products/products.ts`
  - `db.json`
- Yapılanlar:
  - Ürün listesinde silme aksiyonu eklendi.
  - Silme işlemine uygun şekilde mock veri kaynağı güncellendi.

## [2026-02-24] Search input renk düzenlemesi
- Commit: `e0cd9a8`
- Kapsam: Arayüz iyileştirmesi
- Etkilenen Dosyalar:
  - `apps/admin/src/styles.css`
- Yapılanlar:
  - Arama inputunun renk/stil uyumu iyileştirildi.

## [2026-02-25] Ürün güncelleme işlemi
- Commit: `75437eb`
- Kapsam: Products CRUD
- Etkilenen Dosyalar:
  - `apps/admin/src/pages/products/create/create.html`
  - `apps/admin/src/pages/products/create/create.ts`
  - `apps/admin/src/pages/products/products.html`
  - `apps/admin/src/pages/products/products.ts`
  - `db.json`
- Yapılanlar:
  - Ürün güncelleme akışı (edit) eklendi.
  - Liste ve create ekranları güncelleme senaryosuna uygun hale getirildi.
  - Mock veri tarafı güncelleme işlemini destekleyecek şekilde düzenlendi.

## [2026-02-25] Route yapısı refactoring
- Commit: `5ccd4c0`
- Kapsam: Routing mimarisi
- Etkilenen Dosyalar:
  - `apps/admin/src/app.routes.ts`
  - `apps/admin/src/pages/products/routes.ts`
- Yapılanlar:
  - Route tanımları daha modüler bir yapıya taşındı.
  - Products sayfası için route ayrıştırması yapılarak bakım kolaylaştırıldı.

## [2026-02-25] Category listeleme sayfası
- Commit: `3b38291`
- Kapsam: Kategori yönetimi
- Etkilenen Dosyalar:
  - `apps/admin/src/app.routes.ts`
  - `apps/admin/src/navigation.ts`
  - `apps/admin/src/pages/categories/categories.html`
  - `apps/admin/src/pages/categories/categories.ts`
  - `apps/admin/src/pages/categories/routes.ts`
  - `db.json`
- Yapılanlar:
  - Kategori listeleme ekranı oluşturuldu.
  - Kategori sayfası route ve navigasyon menüsüne eklendi.
  - Kategori verisi için mock kaynak güncellendi.

## [2026-02-25] Category create ve update işlemleri
- Commit: `0a933f4`
- Kapsam: Kategori CRUD
- Etkilenen Dosyalar:
  - `apps/admin/src/pages/categories/categories.html`
  - `apps/admin/src/pages/categories/categories.ts`
  - `apps/admin/src/pages/categories/create/create.html`
  - `apps/admin/src/pages/categories/create/create.ts`
  - `apps/admin/src/pages/categories/routes.ts`
  - `apps/admin/src/pages/products/create/create.ts`
  - `apps/admin/src/pages/products/products.ts`
  - `db.json`
- Yapılanlar:
  - Kategori oluşturma ve güncelleme akışları geliştirildi.
  - Category listesi ile create/update ekranları arasında veri akışı tamamlandı.
  - Products tarafında kategori ilişkisini destekleyen uyarlamalar yapıldı.

## [2026-02-25] Son kayıt tekrar gelme hatası düzeltmesi
- Commit: `31eeaeb`
- Kapsam: Create akışı hata düzeltmesi
- Etkilenen Dosyalar:
  - `PROJE-GUNLUGU.md`
  - `apps/admin/src/pages/categories/create/create.ts`
  - `apps/admin/src/pages/products/create/create.ts`
- Yapılanlar:
  - Ekleme işlemi sonrası son kaydın tekrar listelenmesine sebep olan bug giderildi.
  - Category ve product create akışlarındaki ilgili veri işleme adımları düzenlendi.

## [2026-02-25] Endpoint yönetimi refactoring
- Commit: `ab9ace5`
- Kapsam: API altyapısı
- Etkilenen Dosyalar:
  - `apps/admin/src/app.config.ts`
  - `apps/admin/src/constants.ts`
  - `apps/admin/src/interceptors/endpoint-interceptor.ts`
  - `apps/admin/src/pages/categories/categories.ts`
  - `apps/admin/src/pages/categories/create/create.ts`
  - `apps/admin/src/pages/products/create/create.ts`
  - `apps/admin/src/pages/products/products.ts`
- Yapılanlar:
  - Endpoint adreslerinin daha merkezi ve yönetilebilir olması için yapılandırma iyileştirildi.
  - Ortak endpoint akışı interceptor ve sabitler üzerinden sadeleştirildi.
  - Category ve product ekranları yeni endpoint yapısına uyarlandı.

## [2026-02-26] Ürün ekleme ekranına kategori seçimi
- Commit: `33b844e`
- Kapsam: Ürün oluşturma formu
- Etkilenen Dosyalar:
  - `apps/admin/src/constants.ts`
  - `apps/admin/src/interceptors/endpoint-interceptor.ts`
  - `apps/admin/src/pages/products/create/create.html`
  - `apps/admin/src/pages/products/create/create.ts`
  - `apps/admin/src/pages/products/products.ts`
  - `db.json`
  - `package-lock.json`
  - `package.json`
- Yapılanlar:
  - Ürün ekleme formuna kategori listesi eklenip seçim yapılabilir hale getirildi.
  - Kategori verisinin forma taşınması için create ve list akışları güncellendi.
  - Mock veri ve bağımlılık tarafında ilgili düzenlemeler yapıldı.

## [2026-02-26] Kullanıcılar sayfası ve listeleme
- Commit: `efd591b`
- Kapsam: Kullanıcı yönetimi
- Etkilenen Dosyalar:
  - `apps/admin/src/app.routes.ts`
  - `apps/admin/src/navigation.ts`
  - `apps/admin/src/pages/users/routes.ts`
  - `apps/admin/src/pages/users/users.html`
  - `apps/admin/src/pages/users/users.ts`
  - `db.json`
- Yapılanlar:
  - Kullanıcılar listesi için yeni sayfa oluşturuldu.
  - Users sayfası route ve navigasyon menüsüne eklendi.
  - Listeleme için gerekli mock kullanıcı verisi eklendi.

## [2026-02-26] Kullanıcı ekleme ve güncelleme akışı
- Commit: `335e2c4`
- Kapsam: Kullanıcı CRUD
- Etkilenen Dosyalar:
  - `apps/admin/src/pages/users/create/create.html`
  - `apps/admin/src/pages/users/create/create.ts`
  - `apps/admin/src/pages/users/routes.ts`
  - `apps/admin/src/pages/users/users.html`
  - `apps/admin/src/pages/users/users.ts`
  - `db.json`
- Yapılanlar:
  - Kullanıcı create/update işlemleri tamamlandı.
  - Users listesi ile create ekranı arasında veri akışı güncellendi.
  - Mock veri katmanı kullanıcı düzenleme senaryolarına göre düzenlendi.

## [2026-02-27] Title ve breadcrumb güncelleme refactoring
- Commit: `470bed9`
- Kapsam: Sayfa başlığı / breadcrumb
- Etkilenen Dosyalar:
  - `apps/admin/src/components/blank.ts`
  - `apps/admin/src/pages/categories/create/create.html`
  - `apps/admin/src/pages/categories/create/create.ts`
  - `apps/admin/src/pages/products/create/create.html`
  - `apps/admin/src/pages/products/create/create.ts`
  - `apps/admin/src/pages/users/create/create.html`
  - `apps/admin/src/pages/users/create/create.ts`
  - `apps/admin/src/pages/users/users.html`
- Yapılanlar:
  - Create/update ekranlarında başlık ve breadcrumb güncelleme akışı iyileştirildi.
  - Farklı modüllerdeki form ekranları ortak bir güncelleme düzenine çekildi.

## [2026-02-27] Users listesinde IsAdmin güncelleme
- Commit: `333068e`
- Kapsam: Kullanıcı yetki yönetimi
- Etkilenen Dosyalar:
  - `apps/admin/src/pages/users/users.html`
  - `apps/admin/src/pages/users/users.ts`
- Yapılanlar:
  - Kullanıcı listesine `IsAdmin` checkbox alanı eklendi.
  - Checkbox ile kullanıcı admin bilgisinin update edilmesi sağlandı.

## [2026-02-27] Error service ve interceptor ekleme
- Commit: `3f6277d`
- Kapsam: Hata yönetimi
- Etkilenen Dosyalar:
  - `apps/admin/src/app.config.ts`
  - `apps/admin/src/interceptors/error-interceptor.ts`
  - `apps/admin/src/services/error.ts`
- Yapılanlar:
  - Merkezi hata yönetimi için error service yazıldı.
  - HTTP katmanında hata yakalama için error interceptor eklendi.
  - Uygulama konfigürasyonu yeni hata altyapısını kullanacak şekilde güncellendi.

## [2026-02-27] Login sayfası oluşturma
- Commit: `dc9dd65`
- Kapsam: Kimlik doğrulama arayüzü
- Etkilenen Dosyalar:
  - `apps/admin/src/pages/login/login.html`
  - `apps/admin/src/pages/login/login.ts`
- Yapılanlar:
  - Login ekranı için şablon ve component akışı oluşturuldu.
  - Giriş işlemlerini başlatacak temel form/iş mantığı eklendi.

## [2026-02-27] Login password filtering sorunu düzeltmesi
- Commit: `785bac0`
- Kapsam: Login hata düzeltmesi
- Etkilenen Dosyalar:
  - `apps/admin/src/pages/login/login.ts`
- Yapılanlar:
  - Json-server beta sürümünden kaynaklı password filtering davranışı için uyum düzenlemesi yapıldı.
  - Login akışındaki hatalı filtreleme problemi giderildi.

## [2026-02-27] Auth guard ile authentication kontrolü
- Commit: `fd83c2a`
- Kapsam: Yetkilendirme
- Etkilenen Dosyalar:
  - `apps/admin/src/app.routes.ts`
  - `apps/admin/src/guards/auth-guard.ts`
  - `apps/admin/src/pages/login/login.ts`
  - `apps/admin/src/services/common.ts`
  - `db.json`
- Yapılanlar:
  - Route erişimleri için auth guard eklendi.
  - Login ve ortak servis tarafı authentication kontrolü için güncellendi.
  - Gerekli veri yapısı güncellemeleri mock kaynağa işlendi.

## [2026-02-27] Login kullanıcı bilgisini layout’a yerleştirme
- Commit: `03e1eb5`
- Kapsam: Layout / kullanıcı bilgisi
- Etkilenen Dosyalar:
  - `apps/admin/src/pages/layouts/layouts.html`
  - `apps/admin/src/pages/layouts/layouts.ts`
- Yapılanlar:
  - Giriş yapan kullanıcı bilgileri navbar ve sidebar alanlarına taşındı.
  - Layout bileşeni kullanıcı bilgisi gösterimini destekleyecek şekilde güncellendi.
