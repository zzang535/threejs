import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CustomModelLoad from "./components/CustomModelLoad";
import CustomModelAnimation from "./components/CustomModelAnimation";

// import "./assets/tailwind.css";

function App() {
  return (
    <Router>
      <div className="bg-gray-300 p-4">
        <div>
          <Link to="/CustomModelLoad">[glb 파일 불러ssss오기]</Link>
        </div>
        <div>
          <Link to="/CustomModelAnimation">[커스텀 모델ssss 애니메이션]</Link>
        </div>
      </div>
      <Routes>
        <Route path="/CustomModelLoad" element={<CustomModelLoad />}></Route>
        <Route
          path="/CustomModelAnimation"
          element={<CustomModelAnimation />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
