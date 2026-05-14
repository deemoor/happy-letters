import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components'
import { LevelPage } from './pages'

const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <Routes>
        <Route path='/' element={<LevelPage />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
