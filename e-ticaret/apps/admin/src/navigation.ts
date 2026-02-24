export interface NavigationModel{
    title: string;
    url: string;
    icon: string;
}

export const navigations: NavigationModel[] = [
    {
        title: 'Anasayfa',
        icon: 'home',
        url: '/'
    },
    {
        title: 'Ürünler',
        icon: 'deployed_code',
        url: '/products'
    }
];