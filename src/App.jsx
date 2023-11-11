import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/dashboard/Index';
import UserRouter from './routes/user/Index';
import NotFound from './pages/notFound/Index';

function App() {

  
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Dashboard /> } />
            <Route path='/user/*' element={ <UserRouter /> } />
            <Route path='*' element={<NotFound /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
