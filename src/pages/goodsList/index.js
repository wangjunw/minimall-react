import { connect } from 'react-redux';
import GoodsList from './GoodsList';
import { changeCartNum } from '../../components/header/HeaderContainer';
const mapStateToProps = state => ({
    cartNum: state['header'].cartNum
});
const mapDispathToProps = { changeCartNum };
export default connect(
    mapStateToProps,
    mapDispathToProps
)(GoodsList);
