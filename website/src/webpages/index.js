import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
  import Canvas from "./Canvas";
  import Discussions from "./Discussions";
  import Messages from "./Messages";
  
const Webpages = () => {
      return(
          <Router>
              <Route exact path="/" component= {Canvas} />
              <Route path = "/messages" component = {Messages} />
              <Route path = "/discussions" component = {Discussions} />
          </Router>
      );
  };export default Webpages;