// 页面不多就不做按需加载了
import GoodsList from '../pages/goodsList';
import Cart from '../pages/cart';
import Order from '../pages/order/Order';
const routes = [
    {
        path: '/',
        exact: true,
        component: GoodsList
    },
    {
        path: '/goods',
        component: GoodsList
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/order',
        component: Order
    }
];

export default routes;
