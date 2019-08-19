// 页面不多就不做按需加载了
// import GoodsList from '../pages/goodsList';
// import Cart from '../pages/cart';
// import Order from '../pages/order/Order';

// 还是实现一下异步加载组件吧
import AsyncComponent from '../components/asyncLoad';
const routes = [
    {
        path: '/',
        exact: true,
        component: AsyncComponent(() => import('../pages/goodsList'))
    },
    {
        path: '/goods',
        component: AsyncComponent(() => import('../pages/goodsList'))
    },
    {
        path: '/cart',
        component: AsyncComponent(() => import('../pages/cart'))
    },
    {
        path: '/order',
        component: AsyncComponent(() => import('../pages/order/Order'))
    }
];

export default routes;
