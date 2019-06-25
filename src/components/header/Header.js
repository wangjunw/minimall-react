import React from 'react';
import PropTypes from 'prop-types';
import avatar from '../../static/images/avatar.jpg';
import '../../static/styles/header.scss';
class Header extends React.PureComponent {
    componentWillMount() {
        this.props.checkLoginHandler();
    }
    render() {
        return (
            <div>
                <div className="headerContainer">
                    <div className="content">
                        <img src={avatar} alt="" className="avatar" />
                        <div className="user">
                            {this.props.authed ? (
                                <p>
                                    <span className="username">
                                        {this.props.userInfo.username}
                                    </span>
                                    <span
                                        className="log"
                                        onClick={this.props.logoutHandler}
                                    >
                                        Logout
                                    </span>
                                </p>
                            ) : (
                                <p>
                                    <span>请登录呦</span>
                                    <span
                                        onClick={this.props.loginHandler}
                                        className="log"
                                    >
                                        Login
                                    </span>
                                </p>
                            )}
                            <div className="cart">
                                <span className="cartNum">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Header.propTypes = {
    authed: PropTypes.bool.isRequired,
    userInfo: PropTypes.object.isRequired,
    loginHandler: PropTypes.func.isRequired,
    logoutHandler: PropTypes.func.isRequired,
    checkLoginHandler: PropTypes.func.isRequired
};
export default Header;
