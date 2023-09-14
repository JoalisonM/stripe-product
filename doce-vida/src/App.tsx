import { BrowserRouter } from 'react-router-dom';

import { globalStyles } from './styles/global';
import { Router } from './Router';
import { ProductsContextProvider } from './hooks/useProducts';

function App() {
  globalStyles();

  return (
    <BrowserRouter>
      <ProductsContextProvider>
        <Router />
      </ProductsContextProvider>
    </BrowserRouter>
  )
}

export default App
