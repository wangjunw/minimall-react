import React from 'react';
import '../../static/styles/order.scss';
import PropTypes from 'prop-types';
import { _get, _post } from '../../utils/request';
class Order extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            orderDetail: {},
            addresses: [],
            currentAddressIndex: 0
        };
    }
    componentDidMount() {
        _get('/order/address').then(res => {
            if (res.code !== 0) {
                return;
            }
            let data = res.data;
            for (let i = 0, len = data.length; i < len; i++) {
                if (data[i].isDefault) {
                    this.setState({
                        addresses: res.data,
                        currentAddressIndex: i
                    });
                }
            }
        });
        _get('/order/detail', {
            orderId: this.props.location.state.orderId
        }).then(res => {
            if (res.code !== 0) {
                return;
            }
            this.setState(
                {
                    orderDetail: res.data
                },
                () => {
                    console.log(this.state.orderDetail);
                }
            );
        });
    }
    selectAddress = index => {
        this.setState({ currentAddressIndex: index });
    };
    deleteAddressHandler = index => {
        let result = [...this.state.addresses];
        result.splice(index, 1);
        this.setState({
            addresses: result
        });
    };
    settingDefault = index => {
        let result = [...this.state.addresses];
        result.forEach((item, idx) => {
            if (index === idx) {
                item.isDefault = true;
            } else {
                item.isDefault = false;
            }
        });
        this.setState({
            addresses: result
        });
    };
    confirmHandler = () => {
        _post('/order/confirm', {
            orderId: this.props.location.state.orderId
        }).then(res => {
            if (res.code !== 0) {
                return;
            }
            this.props.history.replace('/');
        });
    };
    render() {
        return (
            <div className="orderContainer">
                <h2>SELECT ADDRESS</h2>
                <ul className="addressList">
                    {this.state.addresses.map((item, index) => (
                        <li
                            className={[
                                'addressItem',
                                index === this.state.currentAddressIndex
                                    ? 'actived'
                                    : ''
                            ].join(' ')}
                            key={index}
                            onClick={() => {
                                this.selectAddress(index);
                            }}
                        >
                            <p className="recipient">{item.recipient}</p>
                            <p className="address">{item.address}</p>
                            <p className="mobile">{item.mobile}</p>
                            {item.isDefault ? (
                                <span className="defalut">默认地址</span>
                            ) : (
                                <span
                                    className="defalut"
                                    onClick={() => {
                                        this.settingDefault(index);
                                    }}
                                >
                                    设为默认
                                </span>
                            )}
                            <span
                                className="delete"
                                onClick={() => {
                                    this.deleteAddressHandler(index);
                                }}
                            >
                                删除
                            </span>
                        </li>
                    ))}
                </ul>
                <h2>ORDER DETAIL</h2>

                <table className="goodsList">
                    <thead>
                        <tr>
                            <td>GOODS</td>
                            <td>PRICE</td>
                            <td>QUANTITY</td>
                            <td>SUBTOTAL</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orderDetail.goodsList &&
                            this.state.orderDetail.goodsList.map(item => (
                                <tr key={item.productId}>
                                    <td className="goodsItem">
                                        <img
                                            src={item.productImg}
                                            alt=""
                                            className="goodsPic"
                                        />
                                        <h4>{item.productName}</h4>
                                    </td>
                                    <td>￥{item.productPrice}</td>
                                    <td>{item.productNum}</td>
                                    <td className="subTotal">
                                        ￥
                                        {(
                                            item.productNum * item.productPrice
                                        ).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className="foot">
                    <p>
                        TOTAL PRICE：
                        <span className="price">
                            ￥{this.state.orderDetail.totalPrice}
                        </span>
                    </p>
                    <button
                        className="confirmBuy"
                        onClick={this.confirmHandler}
                    >
                        Confirm Buy
                    </button>
                </div>
            </div>
        );
    }
}
Order.propTypes = {
    history: PropTypes.object.isRequired
};
export default Order;
