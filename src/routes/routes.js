import GoodsList from '../pages/goodsList';
const routes = [
    {
        path: '/',
        exact: true,
        component: GoodsList
    },
    {
        path: '/goods',
        component: GoodsList
    }
];

export default routes;
