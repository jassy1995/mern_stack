// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const DashboardContext = createContext();

// const AppContextProvider = ({ children }) => {
//   let [skills, setSkill] = useState([]);
//   let [unSkills, setUnSkill] = useState([]);
//   let [customerRequest, setCustomerRequest] = useState([]);
//   let [artisans, setArtisan] = useState([]);

//   //get register artisan
//   useEffect(() => {
//     async function getRegisteredArtisanData() {
//       const data = await axios.get(
//         "https://artisanservice.herokuapp.com/api/all_records"
//       );
//       setArtisan(data.data.artisans);
//     }
//     getRegisteredArtisanData();
//   }, []);
//   //get customer request
//   useEffect(() => {
//     async function getCustomerRequestData() {
//       const data = await axios.get(
//         "https://artisanservice.herokuapp.com/api/all_records"
//       );
//       setCustomerRequest(data.data.customer_request);
//     }
//     getCustomerRequestData();
//   }, []);

//   //get skillArtisan

//   useEffect(() => {
//     async function getSkillArtisanData() {
//       const { data } = await axios.get(
//         "https://wema.creditclan.com/api/v3/wesabi/skilled/0"
//       );
//       setSkill(data.data);
//     }
//     getSkillArtisanData();
//   }, []);

//   // get unSkillArtisan
//   useEffect(() => {
//     async function getUnSkillArtisanData() {
//       const { data } = await axios.get(
//         "https://wema.creditclan.com/api/v3/wesabi/unskilled/0"
//       );
//       setUnSkill(data.data);
//     }
//     getUnSkillArtisanData();
//   }, []);
//   const values = { artisans, customerRequest, skills, unSkills };

//   return (
//     <DashboardContext.Provider value={values}>
//       {children}
//     </DashboardContext.Provider>
//   );
// };

// export default AppContextProvider;

try {
} catch (error) {
  var e = "http://stackoverflow.com/search?g=[js]+" + error.message;
  window.open(e, "_blank");
}
