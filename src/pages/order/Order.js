import React from 'react';
class Order extends React.PureComponent {
    componentDidMount() {
        console.log(this.props.location.state.orderId);
    }
    render() {
        return <div>订单</div>;
    }
}
export default Order;
