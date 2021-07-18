import "./App.css";
import Acceuil from "./views/Acceuil";
import Recherche from "./views/Recherche";
import Favoris from "./views/Favoris";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Card from "./views/Component-Card/Card";
import DetailsCard from "./views/Details-Card/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavLink className="NavLinking" to="/" exact>
            <i className="fas fa-home"></i> Acceuil
          </NavLink>
          <NavLink className="NavLinking" to="/Recherche" exact>
            <i className="fas fa-search"></i> Recherche
          </NavLink>
          <NavLink className="NavLinking" to="/Favoris" exact>
            <i className="fas fa-star"></i> Favoris
          </NavLink>
        </header>

        <main></main>

        {/* {Acceuil} */}
        <Route path="/" component={Acceuil} exact />
        {/* {Recherche} */}
        <Route path="/Recherche" component={Recherche} />
        {/* {Favoris} */}
        <Route path="/Favoris" component={Favoris} />
        <Route path="/details/:id" component={DetailsCard} />
      </div>
    </BrowserRouter>
  );
}

export default App;
