import React from 'react';
import { _get } from '../../utils/request';
class GoodsList extends React.PureComponent {
    componentDidMount() {
        this.getGoodsList();
    }
    getGoodsList() {
        _get('/goods', {
            priceRange: '',
            sort: ''
        }).then(res => {});
    }
    render() {
        return <div>商品列表</div>;
    }
}
export default GoodsList;
