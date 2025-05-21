import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SelectDate from "./SelectDate";
import { GlobalProvider } from "./GlobalContext";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
   
   <LocalizationProvider dateAdapter={AdapterDayjs}>
    <GlobalProvider>
    <BrowserRouter base="/Go-On-A-Date">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-a-date" element={<SelectDate />} />
      </Routes>
      </BrowserRouter>
    </GlobalProvider>
    </LocalizationProvider>
    
  );
}

export default App;
