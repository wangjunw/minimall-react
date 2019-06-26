import { connect } from 'react-redux';
import Cart from './Cart';
import { changeCartNum } from '../../components/header/HeaderContainer';
const mapStateToProps = state => ({});
const mapDispatchToProps = { changeCartNum };
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
