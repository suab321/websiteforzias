import React from 'react'
import '../adminlogin/admin.css';


class DetailsDeveloper extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{textAlign:"center"}}>
            <div class='form'>
            <form method="POST" action={`http://localhost:3002/updatedeveloper/${this.props.match.params.email}`}>
            <label style={{fontSize: "2em"}}>Enter the Email Address of new user</label><br/><br/><br/>
            <img src="https://s3.amazonaws.com/thumbnails.illustrationsource.com/huge.102.513291.JPG" alt="" width="200px" height="200px"/><br/><br/>
            <label>Skills</label><br/><br/>
            <input type="text" name="skills" required placeholder="Enter your skills(forntend or backend or android in brief)"/><br/><br/>
            <button style={{cursor: "pointer",fontSize: "1em"}}>Send them the email</button><br/><br/>
            </form>
            </div>
          </div>
        )
    }
}
export default DetailsDeveloper;