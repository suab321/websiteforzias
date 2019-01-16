import React from 'react';
import {url} from '../url';
import './admin.css';



class AdminLogin extends React.Component{
    constructor(){
        super();
        this.state={redirect:null}
        
    }
    render(){
        return(
          <div style={{textAlign:"center"}}>
          <div class='form'>
          <form method="POST" action={`${url}/admin_login`}>
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
export default AdminLogin;