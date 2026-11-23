import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function Placeholder({ title }: { title: string }) {
  return (
    <main>
      <h1>{title}</h1>
      <p>Placeholder — a implementação será feita nas próximas etapas.</p>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <nav aria-label="Navegação principal">
        <Link to="/">Home</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/success">Sucesso</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Placeholder title="Home" />} />
        <Route path="/checkout" element={<Placeholder title="Checkout" />} />
        <Route path="/success" element={<Placeholder title="Pedido confirmado" />} />
      </Routes>
    </BrowserRouter>
  )
}
