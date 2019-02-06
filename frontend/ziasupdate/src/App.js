import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route,Redirect,IndexRoute} from 'react-router';
import AdminLogin from './components/adminlogin/AdminLogin';
import DeveloperLogin from './components/developerlogin/DeveloperLogin';
import DeveloperDetails from './components/details_for_developer/DetailsDeveloper';
import AdminDasboard from './components/admin_dashboard/AdminDashboard';
import {Nav,NavDropdown,Navbar,MenuItem} from 'react-bootstrap';
import New from './components/new/New';
import NewProject from './components/newprojetc/NewProject'
import Password from './components/password/Password';
import DeveloperDashboard from './components/developerdashboard/DeveloperDashboard';
import AssigningDeveloper from './components/assigning_developer/AssigningDevelopers';
import ProjectDetail from './components/showtable/ProjectDetail';
import DevDetail from './components/DeveloperDetail/DevDetail';
import ProjectforDev from './components/showtable/ProjectforDev';



class App extends Component {
  constructor(){
    super();
  }

  render() {
          return (
            <Router>
              <div>
                <switch>
                  <Route path="/mypro/:proid" component={ProjectforDev}/>
                  <Route path="/developerdetail/:devid" component={DevDetail}/>
                  <Route path="/assign/:proid" component={AssigningDeveloper}/>
                  <Route path="/password/:email" component={Password}/>
                  <Route path="/developerdashboard" component={DeveloperDashboard}/>
                  <Route exact path='/adminlogin' component={AdminLogin}/>
                  <Route exact path="/developers_login" component={DeveloperLogin}/>
                  <Route exact path="/developers_details/:email" component={DeveloperDetails}/>
                  <Route exact path="/admindashboard" component={AdminDasboard}/>
                  <Route path="/newproject" component={NewProject}/>
                  <Route path="/new" component={New}/>
                  <Route path="/projectdetail/:id" component={ProjectDetail}/>
                </switch>
                <Navbar inverse fixedTop collapseOnSelect>
                    <Navbar.Header>
                      <Navbar.Brand>
                        <a href="#brand"></a>
                      </Navbar.Brand>
                      <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                      <Nav>
                          <NavDropdown eventKey={3} title="Add" id="basic-nav-dropdown"> 
                          <MenuItem href="/new" >Add new user</MenuItem>
                          <MenuItem href="/newproject">Create New Project</MenuItem>
                          </NavDropdown>
                      </Nav>
                      <Nav pullRight>
                          <NavDropdown eventKey={3} title="Logout" id="basic-nav-dropdown">
                          <MenuItem eventKey={3.2}>Logout</MenuItem>
                        </NavDropdown>
                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>
                  </div>
            </Router>
          )
      }
}

export default App;
