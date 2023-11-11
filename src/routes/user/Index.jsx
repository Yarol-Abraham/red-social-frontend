import { Routes, Route } from 'react-router-dom';

import NotFound from '../../pages/notFound/Index';
import Login from '../../pages/login/Index';
import Register from '../../pages/register/Index';

export default function UserRouter() 
{
  return (
    <Routes>
      <Route path='login' element={<Login /> } /> 
      <Route path='register' element={<Register /> } /> 
      <Route path='*' element={<NotFound /> } />
    </Routes>
  );
}