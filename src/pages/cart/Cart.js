import React from 'react';
import { _get } from '../../utils/request';
import '../../static/styles/cart.scss';
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
                        {this.state.cartList.map(item => (
                            <tr>
                                <td className="goodsItem">
                                    <input type="checkbox" />
                                    <img
                                        alt=""
                                        src={item.productImg}
                                        className="goodsPic"
                                    />
                                    <h4>{item.productName}</h4>
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
