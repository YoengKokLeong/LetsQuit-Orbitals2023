import Home from "./Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Shop from "./components/Shop";
import Social from "./components/Social";
import Profile from "./components/Profile";
import Help from "./components/Help";
import Inventory from "./components/Inventory";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />}>
          {" "}
        </Route>
        <Route path="/SignUp" element={<SignUp />}>
          {" "}
        </Route>
        <Route path="/Home" element={<Home />}>
          {" "}
        </Route>
        <Route path="/Shop" element={<Shop />}>
          {" "}
        </Route>
        <Route path="/Social" element={<Social />}>
          {" "}
        </Route>
        <Route path="/Profile" element={<Profile />}>
          {" "}
        </Route>
        <Route path="/Help" element={<Help />}>
          {" "}
        </Route>
        <Route path="/Inventory" element={<Inventory />}>
          {" "}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
