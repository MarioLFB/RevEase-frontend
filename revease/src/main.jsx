import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './containers/Home'
import ProductList from './components/ProductList'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
