import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./error-handler";
import Navbar from "./components/nav-bar";

import HomePage from "./pages/Home";
import ProductDetailPage from "./pages/product-detail";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <div className="container-fluid mt-5">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product/:id" element={<ProductDetailPage />}></Route>
        </Routes>
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
