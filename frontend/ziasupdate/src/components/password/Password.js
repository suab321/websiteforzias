import React from 'react';

class Password extends React.Component{
    constructor(props){
        super(props)

    }
    render(){
        console.log(this.props.match.params.email);
        return(
            <div style={{textAlign:"center"}}>
            <div class='form'>
            <form method="POST" action={`http://localhost:3002/updatepassword/${this.props.match.params.email}`}>
            <label style={{fontSize: "2em"}}>Enter the Email Address of new user</label><br/><br/><br/>
            <img src="https://s3.amazonaws.com/thumbnails.illustrationsource.com/huge.102.513291.JPG" alt="" width="200px" height="200px"/><br/><br/>
            <label>Name</label><br/><br/>
            <input type="text" name="name" required/><br/><br/>
            <label>contactNo</label><br/><br/>
            <input type="text" name="contactNo" required/><br/><br/>
            <label>Password</label><br/><br/>
            <input type="password" name="password" required/><br/><br/>
            <button style={{cursor: "pointer",fontSize: "1em"}}>Send them the email</button><br/><br/>
            </form>
            </div>
          </div>
        )
    }
}
export default Password; 