import { Route, Routes } from 'react-router-dom'
import { LangProvider } from './lang.jsx'
import Home from './pages/Home.jsx'
import Brief from './pages/Brief.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <LangProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brief" element={<Brief />} />
        <Route path="/brief/:project" element={<Brief />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LangProvider>
  )
}
