import React from 'react';
import { _get, _post } from '../../utils/request';
import '../../static/styles/cart.scss';
import CountCom from '../../components/countComp';
class Cart extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            cartList: []
        };
    }
    componentWillMount() {
        this.getCartList();
    }
    getCartList() {
        _get('/cart/list').then(res => {
            if (res.code !== 0) {
                alert(res.message);
                return;
            }
            this.setState({
                cartList: res.data
            });
        });
    }
    changeCountHandler = (index, count) => {
        let newCartList = [...this.state.cartList];
        newCartList[index].productNum = count;
        this.setState({
            cartList: newCartList
        });
    };
    deleteHandler = (index, id) => {
        /* eslint-disable */
        let result = confirm('确认删除该商品？');
        if (result) {
            _post('/cart/delete', { productId: id }).then(res => {
                if (res.code !== 0) {
                    return;
                }
                let newCartList = [...this.state.cartList];
                newCartList.splice(index, 1);
                this.setState({
                    cartList: newCartList
                });
            });
        }
    };
    render() {
        return (
            <div className="cartContainer">
                <h2>MY CART</h2>
                <table className="goodsList">
                    <thead>
                        <tr>
                            <td>GOODS</td>
                            <td>PRICE</td>
                            <td>QUANTITY</td>
                            <td>TOTAL PRICE</td>
                            <td>OPERATE</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cartList.map((item, index) => (
                            <tr key={item.productId}>
                                <td className="goodsItem">
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                    />
                                    <img
                                        alt=""
                                        src={item.productImg}
                                        className="goodsPic"
                                    />
                                    <h4>{item.productName}</h4>
                                </td>
                                <td>￥{item.productPrice}</td>
                                <td>
                                    <CountCom
                                        count={item.productNum}
                                        productId={item.productId}
                                        index={index}
                                        changeCount={this.changeCountHandler}
                                    />
                                </td>
                                <td>
                                    {(
                                        item.productPrice * item.productNum
                                    ).toFixed(2)}
                                </td>
                                <td>
                                    <span
                                        className="delete"
                                        onClick={() => {
                                            this.deleteHandler(
                                                index,
                                                item.productId
                                            );
                                        }}
                                    >
                                        delete
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button>BUY</button>
                </div>
            </div>
        );
    }
}
export default Cart;
