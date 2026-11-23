import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from './components/Header'
import { CartProvider } from './contexts/CartContext'
import { Checkout } from './pages/Checkout'
import { Home } from './pages/Home'

const PlaceholderMain = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1rem;

  a {
    display: inline-block;
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`

function Placeholder({ title }: { title: string }) {
  return (
    <PlaceholderMain>
      <h1>{title}</h1>
      <p>Placeholder — a implementação será feita nas próximas etapas.</p>
      <Link to="/">Voltar à home</Link>
    </PlaceholderMain>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Placeholder title="Pedido confirmado" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
