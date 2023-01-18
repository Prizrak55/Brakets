import React from "react";
import Navigation from "../Layouts/Navigation/Navigation";
import { BrowserRouter, Routes as RoutesList, Route } from "react-router-dom";
import Brackets from "../pages/TournamentList";
import CreateBrackets from "../pages/CreateTournament";
import RedactorTournament from "../pages/RedactorTournament";
import Tournament from "../pages/DetailedTournament";
const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesList>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Brackets />} />
          <Route path="create-bracket" element={<CreateBrackets />} />
          <Route
            path="redactor-tournament/:id"
            element={<RedactorTournament />}
          />
          <Route path="tournament/:id" element={<Tournament />} />
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
