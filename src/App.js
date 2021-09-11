import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./screens/Login";
import AdminHome from "./screens/AdminHome";
import ManagerHome from "./screens/ManagerHome";
import DeveloperHome from "./screens/DeveloperHome";
import ManagerCompletedTask from "./screens/ManagerCompletedTask";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Login} exact></Route>
          <Route path="/Admin" component={AdminHome} exact></Route>
          <Route path="/Manager" component={ManagerHome} exact></Route>
          <Route
            path="/ManagerCompTask"
            component={ManagerCompletedTask}
            exact
          ></Route>
          <Route path="/Developer/:id" component={DeveloperHome} exact></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
