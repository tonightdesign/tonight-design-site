import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LangProvider } from './lang.jsx'
import Home from './pages/Home.jsx'

// The brief and 404 are split out so the homepage loads only what it needs
const Brief = lazy(() => import('./pages/Brief.jsx'))
const Work = lazy(() => import('./pages/Work.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const Whiteout = lazy(() => import('./pages/Whiteout.jsx'))
const Yuu = lazy(() => import('./pages/Yuu.jsx'))

export default function App() {
  return (
    <LangProvider>
      <Suspense fallback={<div className="bf" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:id" element={<Work />} />
          <Route path="/whiteout" element={<Whiteout />} />
          <Route path="/yuu" element={<Yuu />} />
          <Route path="/casachina" element={<Brief project="casachina" />} />
          <Route path="/brief" element={<Brief />} />
          <Route path="/brief/:project" element={<Brief />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </LangProvider>
  )
}
