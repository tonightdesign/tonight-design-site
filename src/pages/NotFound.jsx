import { Link } from 'react-router-dom'
import { T } from '../lang.jsx'
import { Footer, Header } from '../components/Chrome.jsx'

export default function NotFound() {
  return (
    <div className="bf">
      <Header simple />
      <main id="main" className="bf-main">
        <div className="wrap bf-wrap">
          <section className="bf-card">
            <p className="label">404</p>
            <h1><T en="Nothing here tonight" es="Nada por aquí esta noche" /></h1>
            <div className="ctas"><Link className="btn primary" to="/"><T en="Go to tonight.design" es="Ir a tonight.design" /><span className="ar">→</span></Link></div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
