import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Houses } from "./houseWork/Houses";
import { Users } from "./usersWork/Users";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={<Houses />}></Route>
      <Route path="users" element={<Users />}></Route>
    </Routes>
    </div>
  );
}

export default App;
