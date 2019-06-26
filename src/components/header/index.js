import Header from './Header';
import { actions, key } from './HeaderContainer';
import { connect } from 'react-redux';
let mapStateToProps = state => ({
    userInfo: state[key].userInfo,
    authed: state[key].authed,
    cartNum: state[key].cartNum
});
let mapDispatchToProps = actions;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
