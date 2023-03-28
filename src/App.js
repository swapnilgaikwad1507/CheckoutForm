import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckoutFormUpdated from './screens/checkout/CheckoutFormUpdated';
import ListOfProducts from './screens/productPage/ListOfProducts';
import './screens/checkout/CheckoutForm.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListOfProducts />} />
          <Route path="/checkout" element={<CheckoutFormUpdated />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
