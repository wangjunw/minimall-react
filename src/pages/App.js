import React from 'react';
import renderRoutes from '../routes/renderRoutes';
import styled from 'styled-components';
import routes from '../routes/routes';
// import Header from '../components/header';
import Footer from '../components/footer';
const AppContainer = styled.div`
    background-color: #f5f7fc;
    height: 100vh;
`;
function App() {
    return (
        <AppContainer>
            {/* <Header /> */}
            {renderRoutes(routes)}
            <Footer />
        </AppContainer>
    );
}

export default App;
