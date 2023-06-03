import "./App.css";
import Container from "./pages/dashboardContainer/dashboardContainer";
import Mission from "./pages/missions/missions";
import Ambulances from "./pages/ambulances/ambulances";
import Hospitals from "./pages/hospitals/hospitals";
import Teams from "./pages/teams/teams";
import Login from "./pages/login/login";
import Paramedics from "./pages/paramedics/paramedics";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";

function App() {
  return (
    <>
      <AuthProvider
        authType={"cookie"}
        authName="_auth"
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <Routes>
          <Route path="/" element={<Container />}>
            <Route path="/missions" element={<Mission />}></Route>
            <Route path="/ambulances" element={<Ambulances />}></Route>
            <Route path="/hospitals" element={<Hospitals />}></Route>
            <Route path="/teams" element={<Teams />}></Route>
            <Route path="/paramedics" element={<Paramedics />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
