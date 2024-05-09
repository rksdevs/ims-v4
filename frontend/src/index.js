import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Dashboard } from './screens/Dashboard';
import { Sample } from './screens/Sample';
import {Orders} from './screens/Orders';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import PrivateRoute from './components/PrivateRoute';
import { Products } from './screens/Products';
import { EditProduct } from './screens/EditProduct';
import { Brands } from './screens/Brands';
import { Category } from './screens/Category';
import { EditBrand } from './screens/EditBrand';
import { EditCategory } from './screens/EditCategory';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path="/" element={<PrivateRoute />} >
      <Route index element={<Dashboard />} />
      <Route path='/sample' element={<Sample />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/editProduct/:id' element={<EditProduct />} />
      <Route path='/brands' element={<Brands />} />
      <Route path='/categories' element={<Category />} />
      <Route path='/brands/editBrand/:id' element={<EditBrand />} />
      <Route path='/categories/editCategory/:id' element={<EditCategory />} />
    </Route>
  </Route>
))

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
