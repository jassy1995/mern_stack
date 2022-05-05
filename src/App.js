import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./error-handler";
import Navbar from "./components/nav-bar";
import HomePage from "./pages/homePage";
import ProductPage from "./pages/productPage";
import ProductDetailPage from "./pages/productDetailPage";
import NotFoundPage from "./pages/notFoundPage";
import CartPage from "./pages/cartPage";
import SignInPage from "./pages/signInPage";
import ShippingAddressPage from "./pages/shippingAddressPage";
import SignupPage from "./pages/signupPage";
import PaymentMethodPage from "./pages/paymentMethodPage";
import PlaceOrderPage from "./pages/placeOrderPage";
import OrderHistoryPage from "./pages/orderHistoryPage";
import OrderPage from "./pages/orderPage";
import ProfilePage from "./pages/profilePage";
import SearchPage from "./pages/searchPage";
import { toast, ToastContainer } from "react-toastify";
import { errorHandler } from "./script/error";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        console.log(data);
        setCategories(data);
      } catch (err) {
        toast.error(errorHandler(err));
      }
    };
    fetchCategories();
  }, []);

  const toggleSideBar = async () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const toggleSideBarFalse = async () => {
    setSidebarIsOpen(false);
  };
  return (
    <BrowserRouter>
      <div
        style={{ minHeight: "100vh" }}
        className={
          sidebarIsOpen
            ? "d-flex flex-column site-container active-cont"
            : "d-flex flex-column site-container"
        }
      >
        <ToastContainer position="top-right" limit={1} />
        <ErrorBoundary>
          <Navbar
            toggleSideBar={toggleSideBar}
            categories={categories}
            toggleSideBarFalse={toggleSideBarFalse}
            sidebarIsOpen={sidebarIsOpen}
          />
        </ErrorBoundary>
        <div className="container-fluid mt-5" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/product/:id" element={<ProductDetailPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/shipping" element={<ShippingAddressPage />}></Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/payment" element={<PaymentMethodPage />}></Route>
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />}></Route>
            <Route path="/orderhistory" element={<OrderHistoryPage />}></Route>
            <Route path="/products" element={<ProductPage />}></Route>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <footer>
          <div
            className="text-center p-3  text-white"
            style={{ backgroundColor: "#409EFF", marginTop: "10px" }}
          >
            All right reserved
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;

//  <BrowserRouter>
//    <Routes>
//      <Route path="/" element={<Index />}>
//        <Route index element={<DashboardPage users={customerRequest} />} />
//        <Route path="skill" element={<SkillPage users={skills} />} />
//        <Route
//          path="unSkill"
//          element={
//            <UnSkillPage
//              users={unSkills}
//              pre_function={pre_function}
//              next_function={next_function}
//            />
//          }
//        />
//        <Route path="artisan" element={<ArtisanPage users={artisans} />} />
//        <Route
//          path="customer"
//          element={<CustomerRequestPage users={customerRequest} />}
//        />
//        <Route path="assign/:id" element={<AssignPage />} />
//        <Route path="*" element={<NotFound />} />
//      </Route>
//    </Routes>
//  </BrowserRouter>;
