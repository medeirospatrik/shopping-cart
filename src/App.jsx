import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import SellerConfirmation from './components/SellerConfirmation/SellerConfirmation';
import ConfirmationSuccess from './components/ConfirmationSuccess/ConfirmationSuccess';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/seller-confirmation/:orderId" element={<SellerConfirmation />} />
              <Route path="/confirmacao-sucesso" element={<ConfirmationSuccess />} />
            </Routes>
          </main>
          <Cart />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
