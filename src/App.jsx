import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import Home from './pages/home/Home';
import MyState from './context/data/myState';
import AllProducts from './pages/allproducts/AllProducts';
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productinfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from "./pages/allproducts/AllProducts";

const App = () => {
  return (

  <MyState>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/order" element={
             <ProtectedRoute>
                <Order />
             </ProtectedRoute>
        }/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/dashboard" element={
          <ProtectedRouteForAdmin>
            <Dashboard />
          </ProtectedRouteForAdmin>
        }/>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/productinfo/:id" element={<ProductInfo />}></Route>

        <Route path="/addproduct" element={
          <ProtectedRouteForAdmin>
            <AddProduct />
          </ProtectedRouteForAdmin>
        }/>

        <Route path="/updateproduct" element={
          <ProtectedRouteForAdmin>
             <UpdateProduct />
          </ProtectedRouteForAdmin>
        }/>
        <Route path="/*" element={<NoPage />}/>  
        <Route path="/allproducts" element={<Allproducts />}></Route>

      </Routes>
      <ToastContainer />
    </Router> 
  </MyState>

  )
}

export default App


// user                         //This <Order /> becomes the value of children
export const ProtectedRoute = ({children}) => {

  const user = localStorage.getItem('user')
  if(user) {
    return children       //"If the user is logged in, show whatever is inside this ProtectedRoute — like <Order />"
  } else{
    return <Navigate to ={'/login'} />  
  }
}


//admin
const ProtectedRouteForAdmin = ({children}) => {   
      const admin = JSON.parse(localStorage.getItem('user'))

      if(admin.user.email === 'ayush@gmail.com'){
        return children
      }

      else{
        return <Navigate to={'/login'}/>   //react-router-dom
      }

}