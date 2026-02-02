import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
function App() {

  return (
   <>
    <Toaster position="top-center" />
    <Routes>
      <Route path='/'  element={
         <ProtectedRoute>
            <HomePage />
         </ProtectedRoute>
        } />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
   </>
  )
}

export default App
