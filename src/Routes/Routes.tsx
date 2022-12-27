import React from "react";
import Navigation from "../Layouts/Navigation/Navigation";
import {
  BrowserRouter,
  Routes as RoutesList,
  Route,
  Link,
} from "react-router-dom";
import Brackets from "../pages/Brackets";
import CreateBrackets from "../pages/CreateBracket";
const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesList>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Brackets />} />
          <Route path="create-bracket" element={<CreateBrackets />} />
          {/* <Route path="create-bracket" element={<Brackets />} /> */}
          {/* <Route path="users" element={<Users />}>
          <Route path="me" element={<OwnUserProfile />} />
          <Route path=":id" element={<UserProfile />} />
        </Route> */}
        </Route>
      </RoutesList>
    </BrowserRouter>
  );
};

export default Routes;
