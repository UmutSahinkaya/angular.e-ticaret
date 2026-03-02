export interface NavigationModel{
    title: string;
    url: string;
    icon: string;
}

export const navigations: NavigationModel[] = [
  {
    title: 'Anasayfa',
    icon: 'home',
    url: '/',
  },
  {
    title: 'Kategoriler',
    icon: 'category',
    url: '/categories',
  },
  {
    title: 'Ürünler',
    icon: 'deployed_code',
    url: '/products',
  },
  {
    title: 'Kullanıcılar',
    icon: 'group',
    url: '/users',
  },
  {
    title: 'Siparişler',
    icon: 'receipt_long',
    url: '/orders',
  },
];
