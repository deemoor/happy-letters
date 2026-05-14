import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout, LevelPage } from './pages'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LevelPage />} />
        <Route path="*" element={<Navigate to='/' />} />
      </Route>
    </Routes>
  )
}

export default App
