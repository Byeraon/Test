import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Houses } from "./houseWork/Houses";
import { Users } from "./usersWork/Users";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Houses />}></Route>
      <Route path="users" element={<Users />}></Route>
    </Routes>
  );
}

export default App;
