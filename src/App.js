import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./error-handler";
import Navbar from "./components/nav-bar";
import HomePage from "./pages/homePage";
import ProductPage from "./pages/productPage";
import ProductDetailPage from "./pages/productDetailPage";
import NotFoundPage from "./pages/notFoundPage";
import CartPage from "./pages/cartPage";
import SignInPage from "./pages/signInPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <ToastContainer position="top-right" limit={1} />
        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
        <div className="container-fluid mt-5" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/product/:id" element={<ProductDetailPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/search" element={<ProductPage />}></Route>
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
