import React from 'react';
import styled from 'styled-components';
import Logo from '../static/images/logo.png'
const HeaderContainer = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
`
class Header extends React.PureComponent{
    render(){
        return (
            <div>
                <HeaderContainer>
                    <img src={Logo} alt=""/>
                </HeaderContainer>
            </div>
        )
    }
}
export default Header;