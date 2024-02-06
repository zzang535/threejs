import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import CustomModelLoad from "./components/CustomModelLoad";
import CustomModelAnimation from "./components/CustomModelAnimation";
import PhysicsEngineWorld from "./components/PhysicsEngineWorld";
import ContactMaterial from "./components/ContactMaterial";
import Force from "./components/Force";
import RandomPositionBallCreate from "./components/RandomPositionBallCreate";
import CollisionSound from "./components/CollisionSound";
import ObjectRemove from "./components/ObjectRemove";
import Domino from "./components/Domino";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname == "/" && (
        <div className="bg-gray-300 p-4">
          <div>
            <Link to="/CustomModelLoad">
              [커스텀 모델 로드 (CustomModelLoad)]
            </Link>
          </div>
          <div>
            <Link to="/CustomModelAnimation">
              [커스텀 모델 애니메이션 (CustomModelAnimation)]
            </Link>
          </div>
          <div>
            <Link to="/PhysicsEngineWorld">
              [물리엔진 월드 생성 (PhysicsEngineWorld)]
            </Link>
          </div>
          <div>
            <Link to="/ContactMaterial">
              [재질에 다른 마찰력과 반발력 (Contact Material)]
            </Link>
          </div>
          <div>
            <Link to="/Force">[힘 (Force) - 화면을 클릭]</Link>
          </div>
          <div>
            <Link to="/RandomPositionBallCreate">
              [랜덤 위치에 공 생성하기 (RandomPositionBallCreate) - 화면을 클릭]
            </Link>
          </div>
          <div>
            <Link to="/CollisionSound">[충돌 사운드 (CollisionSound)]</Link>
          </div>
          <div>
            <Link to="/ObjectRemove">
              [오브젝트 제거 (ObjectRemove) - 화면을 클릭, 삭제버튼 클릭]
            </Link>
          </div>
          <div>
            <Link to="/Domino">[도미노 (Domino)]</Link>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/CustomModelLoad" element={<CustomModelLoad />}></Route>
        <Route
          path="/CustomModelAnimation"
          element={<CustomModelAnimation />}
        ></Route>
        <Route
          path="/PhysicsEngineWorld"
          element={<PhysicsEngineWorld />}
        ></Route>
        <Route path="/ContactMaterial" element={<ContactMaterial />}></Route>
        <Route path="/Force" element={<Force />}></Route>
        <Route
          path="/RandomPositionBallCreate"
          element={<RandomPositionBallCreate />}
        ></Route>
        <Route path="/CollisionSound" element={<CollisionSound />}></Route>
        <Route path="/ObjectRemove" element={<ObjectRemove />}></Route>
        <Route path="/Domino" element={<Domino />}></Route>
      </Routes>
    </>
  );
}

export default App;
