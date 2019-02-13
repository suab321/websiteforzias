import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router';
import AdminLogin from './components/adminlogin/AdminLogin';
import DeveloperLogin from './components/developerlogin/DeveloperLogin';
import DeveloperDetails from './components/details_for_developer/DetailsDeveloper';
import AdminDasboard from './components/admin_dashboard/AdminDashboard';
import {Nav,NavDropdown,Navbar,MenuItem,Button} from 'react-bootstrap';
import New from './components/new/New';
import NewProject from './components/newprojetc/NewProject'
import Password from './components/password/Password';
import DeveloperDashboard from './components/developerdashboard/DeveloperDashboard';
import AssigningDeveloper from './components/assigning_developer/AssigningDevelopers';
import ProjectDetail from './components/showtable/ProjectDetail';
import DevDetail from './components/DeveloperDetail/DevDetail';
import ProjectforDev from './components/showtable/ProjectforDev';
import All_Developer from './components/alldeveloper/All_developer';
import Axios from 'axios';
import {Redirect} from 'react-router';



class App extends Component {
  constructor(){
    super();
    this.state={redirect:false}
    this.logout=this.logout.bind(this);
  }

  logout(){
    Axios.get('http://localhost:3002/logout',{withCredentials:true}).then(res=>{
      if(res.data === 'ok')
        this.setState({redirect:true});
    })
  }

  render() {
    if(this.state.redirect){
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
                      </Navbar.Brand>
                      <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                      <Nav>
                          <Button href="/adminlogin">LOGIN</Button>
                          <NavDropdown eventKey={3} title="Add" id="basic-nav-dropdown">
                          <MenuItem href="/developerdashboard" >Home</MenuItem> 
                          <MenuItem href="/new" >Add new user</MenuItem>
                          <MenuItem href="/newproject">Create New Project</MenuItem>
                          <MenuItem href="/all_developer">Meet all the developers</MenuItem>
                          </NavDropdown>
                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>
                  <Redirect to='/adminlogin'/>            
                   </div>
            </Router>
          )
        }
        else{
          return (
            <Router>
              <div>
                <switch>
                  <Route path="/all_developer" component={All_Developer}/>
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
                      </Navbar.Brand>
                      <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                      <Nav>
                      <Button href="/developerdashboard">HOME</Button>
                      <Button href="/adminlogin">LOGIN</Button>
                          <NavDropdown eventKey={3} title="Add" id="basic-nav-dropdown">
                          <MenuItem href="/new" >Add new user</MenuItem>
                          <MenuItem href="/newproject">Create New Project</MenuItem>
                          <MenuItem href="/all_developer">Meet all the developers</MenuItem>
                          </NavDropdown>
                      </Nav>
                      <Nav pullRight>
                          <NavDropdown onClick={this.logout} eventKey={3} title="Logout" id="basic-nav-dropdown">
                        </NavDropdown>
                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>
                  </div>
            </Router>
          )
        }
      }
}

export default App;
