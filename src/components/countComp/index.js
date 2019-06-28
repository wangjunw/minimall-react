import React from 'react';
import styled from 'styled-components';
import { _post } from '../../utils/request';
import PropTypes from 'prop-types';
const ActionBtn = styled.span`
    display: inline-block;
    width: 40px;
    font-size: 20px;
    height: 28px;
    text-align: center;
    line-height: 24px;
    background-color: #f0f0f0;
    vertical-align: middle;
    cursor: pointer;
`;
const Count = styled.span`
    border: solid 1px #f0f0f0;
    display: inline-block;
    height: 28px;
    text-align: center;
    width: 40px;
    box-sizing: border-box;
`;
class CountCom extends React.PureComponent {
    state = {
        productNum: this.props.count
    };
    changeCount = type => {
        let curCount = this.state.productNum;
        if (curCount === 1 && type === '-') {
            return;
        }
        let newCount = type === '+' ? curCount + 1 : curCount - 1;
        this.props.changeCount(this.props.index, newCount);
        _post('/cart/changeNum', {
            productId: this.props.productId,
            productNum: newCount
        }).then(res => {
            if (res.code !== 0) {
                return;
            }
        });
        this.setState({
            productNum: newCount
        });
    };
    render() {
        return (
            <div>
                <ActionBtn
                    onClick={() => {
                        this.changeCount('-');
                    }}
                >
                    -
                </ActionBtn>
                <Count>{this.state.productNum}</Count>
                <ActionBtn
                    onClick={() => {
                        this.changeCount('+');
                    }}
                >
                    +
                </ActionBtn>
            </div>
        );
    }
}
CountCom.propTypes = {
    productId: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    changeCount: PropTypes.func.isRequired
};
export default CountCom;
