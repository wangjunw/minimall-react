
import Header from './Header'
import {actions, key} from './HeaderContainer'
import {connect} from 'react-redux'
let mapStateToProps = (state)=>({
    userInfo: state[key].userInfo
});
let mapDispatchToProps = actions;
export default connect(mapStateToProps,mapDispatchToProps)(Header);