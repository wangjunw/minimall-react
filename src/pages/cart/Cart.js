import React from 'react';
import { _get, _post } from '../../utils/request';
import '../../static/styles/cart.scss';
import CountCom from '../../components/countComp';
import PropTypes from 'prop-types';
class Cart extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            cartList: [],
            totalPrice: 0,
            allChecked: false
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
            let result = [];
            res.data.map(item => {
                return result.push(Object.assign({}, item, { checked: false }));
            });
            this.setState({
                cartList: result
            });
        });
    }
    changeCountHandler = (index, count) => {
        let newCartList = [...this.state.cartList];
        newCartList[index].productNum = count;
        this.setState(
            {
                cartList: newCartList
            },
            () => {
                this.calculateHandler();
            }
        );
    };
    // 删除
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
                this.setState(
                    {
                        cartList: newCartList
                    },
                    () => {
                        this.calculateHandler();
                        this.props.changeCartNum(this.state.cartList.length);
                    }
                );
            });
        }
    };
    // 勾选
    checkHandler = index => {
        let result = [...this.state.cartList];
        result[index].checked = !result[index].checked;
        let allChecked = true;
        result.forEach(item => {
            if (!item.checked) {
                allChecked = false;
                return;
            }
        });
        this.setState({ cartList: result, allChecked }, () => {
            this.calculateHandler();
        });
    };
    // 全选
    allCheckHandler = () => {
        let result = [...this.state.cartList];
        result.forEach(item => {
            item.checked = !this.state.allChecked;
        });
        this.setState(
            {
                cartList: result,
                allChecked: !this.state.allChecked
            },
            () => {
                this.calculateHandler();
            }
        );
    };
    // 计算总价
    calculateHandler = () => {
        let totalPrice = 0;
        this.state.cartList.forEach(item => {
            if (item.checked) {
                totalPrice += item.productNum * item.productPrice;
            }
        });
        this.setState({ totalPrice: totalPrice });
    };
    //创建订单
    createOrderHandler = () => {
        let goodsList = this.state.cartList.filter(item => {
            return item.checked;
        });
        if (goodsList.length === 0) {
            return;
        }
        _post('/cart/createOrder', {
            totalPrice: this.state.totalPrice,
            goodsList: JSON.stringify(goodsList)
        }).then(res => {
            if (res.code !== 0) {
                return;
            }
            this.props.changeCartNum(res.cartNum);
            this.props.history.push('/order', { orderId: res.orderId });
        });
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
                            <td>ITEM TOTAL</td>
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
                                        onChange={() => {
                                            this.checkHandler(index);
                                        }}
                                        checked={item.checked}
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
                <div className="foot">
                    <div className="selectAll">
                        <input
                            type="checkbox"
                            className="checkbox"
                            onChange={this.allCheckHandler}
                            checked={this.state.allChecked}
                        />
                        <span>Select All</span>
                    </div>
                    <div className="total">
                        <p>
                            Total Price：
                            <span className="totalPrice">
                                ￥{this.state.totalPrice.toFixed(2)}
                            </span>
                        </p>
                        <button onClick={this.createOrderHandler}>
                            CreateOrder
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
Cart.propTypes = {
    history: PropTypes.object.isRequired,
    changeCartNum: PropTypes.func.isRequired
};
export default Cart;
