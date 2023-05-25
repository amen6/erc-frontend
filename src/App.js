import "./App.css";
import Container from "./pages/dashboardContainer/dashboardContainer";
import Mission from "./pages/missions/missions";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route path="/missions" element={<Mission />}></Route>
          {/* <Route path="/" element={<Dashboard />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/events" element={<Events />}></Route> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
