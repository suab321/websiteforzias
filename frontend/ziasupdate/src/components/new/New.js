import React from 'react';
import '../adminlogin/admin.css';
import Axios from 'axios';

class New extends React.Component{
    constructor(){
        super();
        this.state={error:1};
        this.email=React.createRef();
        this.role=React.createRef();
        this.create=this.create.bind(this);
        Axios.get('http://localhost:3002/user',{withCredentials:true}).then(res=>{
            if(res.status===200){
                Axios.get(`http://localhost:3002/cancreate`,{headers:{Authorization: `Bearer ${res.data}`}})
                .then(res=>{
                    if(res.status===200){
                       this.setState({error:0});
                    }
                })
            }
        })
    }
    create(){
        if(!this.state.error){
            Axios.get('http://localhost:3002/user',{withCredentials:true}).then(res=>{
                if(res.status===200){
                    Axios.post('http://localhost:3002/create',{email:this.email.current.value,role:this.role.current.value},{headers:{Authorization: `Bearer ${res.data}`}})
                }
            })
            
            }

        console.log(this.email.current.value);
    }

    render(){
        if(this.state.error){
            return(
                <div style={{textAlign:"center"}}>
                    <div className='form'>
                    <div>
                    <label style={{fontSize: "2em"}}>New Project</label><br/><br/><br/>
                    <img src="https://s3.amazonaws.com/thumbnails.illustrationsource.com/huge.102.513291.JPG" alt="" width="200px" height="200px"/><br/><br/>
                    <h2 style={{color:"red"}}>You are not an admin hence you can cannot create project or add user!</h2>
                    <label>email</label><br/><br/>
                    <input ref={this.email} required type="text"/><br/><br/>
                    <select name="role">
                    <option value="admin">Admin</option>
                    <option value="developer">Developer</option>
                    </select><br/><br/>
                    <button style={{cursor: "pointer",fontSize: "1em"}} onClick={this.create}>Create</button><br/><br/>
                    </div>
                    </div>
                </div>
            )
          }
          else{
            return(
                <div style={{textAlign:"center"}}>
                    <div class='form'>
                    <div>
                    <label style={{fontSize: "2em"}}>New Project</label><br/><br/><br/>
                    <img src="https://s3.amazonaws.com/thumbnails.illustrationsource.com/huge.102.513291.JPG" alt="" width="200px" height="200px"/><br/><br/>
                    <label>Email</label><br/><br/>
                    <input ref={this.email} required type="text"/><br/><br/>
                    <select ref={this.role} name="role">
                    <option value="admin">Admin</option>
                    <option value="developer">Developer</option>
                    </select><br/><br/>
                    <button style={{cursor: "pointer",fontSize: "1em"}} onClick={this.create}>Create</button><br/><br/>
                    </div>
                    </div>
                </div>
            )
          }
    }
}
export default New;