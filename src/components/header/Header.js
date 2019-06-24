import React from 'react';
import PropTypes from 'prop-types';
import avatar from '../../static/images/avatar.jpg';
import '../../static/styles/header.scss';
class Header extends React.PureComponent {
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
                                        onClick={this.props.loginHandler}
                                    >
                                        Logout
                                    </span>
                                </p>
                            ) : (
                                <p
                                    onClick={this.props.loginHandler}
                                    className="log"
                                >
                                    Login
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
    logoutHandler: PropTypes.func.isRequired
};
export default Header;
