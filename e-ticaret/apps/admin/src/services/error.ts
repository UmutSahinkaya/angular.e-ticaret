import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FlexiToastService } from 'flexi-toast';

@Injectable({
  providedIn: 'root',
})
export class Error {
  readonly #toast = inject(FlexiToastService);

  handle(err: HttpErrorResponse) {
    switch (err.status) {
      case 0:
        this.#toast.showToast(
          'Hata',
          'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
          'error',
        );
        break;
      case 400:
        this.#toast.showToast('Hata', err.message, 'error');
        break;
      case 401:
        this.#toast.showToast('Hata', 'Yetkisiz erişim.', 'error');
        break;
      case 403:
        this.#toast.showToast('Hata', 'Erişim engellendi.', 'error');
        break;
      case 404:
        this.#toast.showToast('Hata', 'Kaynak bulunamadı.', 'error');
        break;
      case 422:
        this.#toast.showToast('Hata', 'Geçersiz veri gönderildi.', 'error');
        break;
      case 429:
        this.#toast.showToast(
          'Hata',
          'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.',
          'error',
        );
        break;
      case 500:
        this.#toast.showToast('Hata', err.message, 'error');
        break;
      case 503:
        this.#toast.showToast(
          'Hata',
          'Hizmet geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.',
          'error',
        );
        break;
      case 504:
        this.#toast.showToast(
          'Hata',
          'Sunucu yanıt vermiyor. Lütfen daha sonra tekrar deneyin.',
          'error',
        );
        break;
      default:
        this.#toast.showToast('Hata', 'Bilinmeyen bir hata oluştu.', 'error');
        break;
    }
  }
}
