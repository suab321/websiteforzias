import React from 'react';
import '../adminlogin/admin.css'
import url from '../url';


class DeveloperLogin extends React.Component{
    constructor(){
        super();
        this.password=React.createRef();
        this.email=React.createRef();
        this.login=this.login.bind(this);
    }
    
   login(){
     
   }
    
    render(){
        return(
          <div style={{textAlign:"center"}}>
          <div class='form'>
          <form method="POST" action='http://localhost:3002/developerlogin'>
          <label style={{fontSize: "2em"}}>AdminLogin</label><br/><br/><br/>
          <img src="https://s3.amazonaws.com/thumbnails.illustrationsource.com/huge.102.513291.JPG" alt="" width="200px" height="200px"/><br/><br/>
          <label>Email</label><br/><br/>
          <input type="email" name="email" required/><br/><br/>
          <label>Password</label><br/><br/>
          <input type="password" name="password" required /><br/><br/>
          <button style={{cursor: "pointer",fontSize: "1em"}}>Register</button><br/><br/>
          </form>
          </div>
        </div>
        )
    }
}
export default DeveloperLogin;