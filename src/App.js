import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./error-handler";
import Navbar from "./components/nav-bar";
import HomePage from "./pages/homePage";
import ProductPage from "./pages/productPage";
import ProductDetailPage from "./pages/productDetailPage";
import NotFoundPage from "./pages/notFoundPage";
import { Store } from "./store";
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
import AuthGuard from "./components/guards/auth-guard";
import DashboardPage from "./pages/DashboardPage";
import AdminGuard from "./components/guards/admin-guard";
import { toast, ToastContainer } from "react-toastify";
import { errorHandler } from "./script/error";
import Footer from "./components/footer";
import "react-toastify/dist/ReactToastify.css";
import AdminProductPage from "./pages/adminProductPage";
import OrderListPage from "./pages/orderListPage";
import UserListPage from "./pages/userListPage";
import MapPage from "./pages/mapPage";
import http from "./lib/http";

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox } = state;
  console.log(ctxDispatch);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await http.get(`/api/products/categories`);
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
            ? fullBox
              ? "site-container active-cont d-flex flex-column full-box"
              : "site-container active-cont d-flex flex-column"
            : fullBox
            ? "site-container d-flex flex-column full-box"
            : "site-container d-flex flex-column"
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

          <div className="container-fluid mt-5" style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route
                path="/product/:id"
                element={<ProductDetailPage />}
              ></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/shipping" element={<ShippingAddressPage />}></Route>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/payment" element={<PaymentMethodPage />}></Route>
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/products" element={<ProductPage />}></Route>
              <Route path="/search" element={<SearchPage />} />
              <Route
                path="/map"
                element={
                  <AuthGuard>
                    <MapPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/orderhistory"
                element={
                  <AuthGuard>
                    <OrderHistoryPage />
                  </AuthGuard>
                }
              ></Route>
              <Route
                path="/order/:id"
                element={
                  <AuthGuard>
                    <OrderPage />
                  </AuthGuard>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <AuthGuard>
                    <ProfilePage />
                  </AuthGuard>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminGuard>
                    <DashboardPage />
                  </AdminGuard>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminGuard>
                    <UserListPage />
                  </AdminGuard>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminGuard>
                    <AdminProductPage />
                  </AdminGuard>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminGuard>
                    <OrderListPage />
                  </AdminGuard>
                }
              ></Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
}
export default App;
