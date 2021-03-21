import "./App.css";
import "./bootstrap.min.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Prodaja from "./components/prodaja/Prodaja";
import Narudzba from "./components/narudzba/Narudzba";
import Evidencija from "./components/evidencija/Evidencija";
import Izvjestaj from "./components/izvjestaj/Izvjestaj";
import Header from "./components/Header.js";
import Login from "./components/login/Login.js";
import Temperatura from "./components/temperatura/Temperatura.js";
import Help from "./components/help/Help.js";

function App() {
  return (
    <div>
      <Header></Header>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/prodaja">
            <Prodaja />
          </Route>
          <Route exact path="/narudzba">
            <Narudzba />
          </Route>
          <Route exact path="/evidencija">
            <Evidencija />
          </Route>
          <Route exact path="/izvjestaj">
            <Izvjestaj />
          </Route>
          <Route exact path="/logout">
            <Login />
          </Route>
          <Route exact path="/temperatura">
            <Temperatura />
          </Route>
          <Route exact path="/pomoc">
            <Help />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
