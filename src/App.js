import "./App.css";
import Container from "./pages/dashboardContainer/dashboardContainer";
import Mission from "./pages/missions/missions";
import Ambulances from "./pages/ambulances/ambulances";
import Hospitals from "./pages/hospitals/hospitals";
import Teams from "./pages/teams/teams";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route path="/missions" element={<Mission />}></Route>
          <Route path="/ambulances" element={<Ambulances />}></Route>
          <Route path="/hospitals" element={<Hospitals />}></Route>
          <Route path="/teams" element={<Teams />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
