import React from 'react';
import PropTypes from 'prop-types';
import { _get, _post } from '../../utils/request';
import '../../static/styles/goodsList.scss';
import config from '../../utils/config';
class GoodsList extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            goodsList: [],
            sortWay: 'default', //排序方式：默认/价格
            currentSort: 'descending', //价格升降序
            priceList: [
                'All',
                '0.00-100.00',
                '100.00-500.00',
                '500.00-1000.00',
                '1000.00-2000.00'
            ],
            currentPriceRange: 'All', //当前选择价格区间
            pageSize: 8,
            page: 0,
            loadAll: false, //是否加载完成全部数据
            loading: false //加载中样式
        };
    }
    componentDidMount() {
        this.getGoodsList();
        window.addEventListener('scroll', this.loadMore);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore);
    }
    loadMore = () => {
        if (this.state.loadAll) {
            return;
        }
        if (
            document.documentElement.scrollTop +
                document.documentElement.clientHeight ===
            document.documentElement.scrollHeight
        ) {
            this.setState(
                {
                    page: this.state.page + 1
                },
                () => {
                    this.getGoodsList();
                }
            );
        }
    };
    getGoodsList() {
        this.setState({
            loading: true
        });
        _get('/goods/list', {
            priceRange: this.state.currentPriceRange,
            sortWay: this.state.sortWay,
            priceSort: this.state.currentSort,
            page: this.state.page,
            pageSize: this.state.pageSize
        }).then(res => {
            if (res.code !== 0) {
                return;
            }
            // 如果返回的数据小于pageSize说明加载完毕
            if (res.data.length < this.state.pageSize) {
                this.setState({
                    loadAll: true
                });
            }
            this.setState({
                goodsList:
                    this.state.page === 0
                        ? res.data
                        : this.state.goodsList.concat(res.data),
                loading: false
            });
        });
    }
    sortHandler(sortWay) {
        this.setState(
            {
                sortWay,
                page: 0,
                loadAll: false
            },
            () => {
                this.getGoodsList();
            }
        );
        if (sortWay === 'price' && this.state.sortWay === 'price') {
            this.setState({
                currentSort:
                    this.state.currentSort === 'descending'
                        ? 'ascending'
                        : 'descending'
            });
        }
    }
    // 选择价格区间
    selectPriceRange(priceRange) {
        this.setState(
            {
                currentPriceRange: priceRange,
                page: 0
            },
            () => {
                this.getGoodsList();
            }
        );
    }
    addToCart(productId) {
        _post('/goods/addCart', { productId }).then(res => {
            if (res.code !== 0) {
                alert(res.message);
                return;
            }
            this.props.changeCartNum(res.cartsNum);
            alert(res.message);
        });
    }
    render() {
        return (
            <div className="goodsListContainer" ref="scrollBox">
                <div className="sortHead">
                    Sort by：
                    <span
                        className={
                            this.state.sortWay === 'default' ? 'active' : ''
                        }
                        onClick={() => {
                            this.sortHandler('default');
                        }}
                    >
                        Default
                    </span>
                    <span
                        className={
                            this.state.sortWay === 'price' ? 'active' : ''
                        }
                        onClick={() => {
                            this.sortHandler('price');
                        }}
                    >
                        Price{' '}
                        <span
                            className={
                                this.state.currentSort === 'ascending'
                                    ? 'sortByAscending'
                                    : ''
                            }
                        >
                            ↑
                        </span>
                    </span>
                </div>
                <div className="content">
                    <dl className="priceList">
                        <dt>Price</dt>
                        {this.state.priceList.map((item, index) => (
                            <dd
                                key={index}
                                onClick={() => {
                                    this.selectPriceRange(item);
                                }}
                                className={
                                    this.state.currentPriceRange === item
                                        ? 'active'
                                        : ''
                                }
                            >
                                {item}
                            </dd>
                        ))}
                    </dl>
                    <ul className="goodsList">
                        {this.state.goodsList.map((item, index) => (
                            <li key={index}>
                                <img
                                    alt=""
                                    src={`${config.serverUrl}${
                                        item.productImg
                                    }`}
                                    className="goodsPic"
                                />
                                <div className="goodsDesc">
                                    <p className="goodsName">
                                        {item.productName}
                                    </p>
                                    <p className="goodsPrice">
                                        ￥{item.productPrice.toFixed(2)}
                                    </p>
                                    <button
                                        className="toCart"
                                        onClick={() => {
                                            this.addToCart(item.productId);
                                        }}
                                    >
                                        加入购物车
                                    </button>
                                </div>
                            </li>
                        ))}
                        {this.state.loading ? (
                            <p className="loading">加载中...</p>
                        ) : (
                            ''
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}
GoodsList.propTypes = {
    changeCartNum: PropTypes.func.isRequired
};
export default GoodsList;
