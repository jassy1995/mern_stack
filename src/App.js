import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import axios from "axios";

// import AppContextProvider from "./api/context";

function App() {
  return (
    <>
      <div>
        <header>
          <a href="https://">amazon</a>
        </header>
        <main>list</main>
      </div>
    </>
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
