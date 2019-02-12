import React from 'react'
import Axios from 'axios';
import {Button} from 'react-bootstrap';
import {ShowTable2} from '../showtable/ShowTable';
import {Redirect} from 'react-router';

class DeveloperDashoard extends React.Component{
    constructor(props){
        super(props);
        this.state={name:"",error:"yes",type:""};

        Axios.get('http://localhost:3002/user',{withCredentials:true}).then(res=>{
            if(res.status===200){
                Axios.get(`http://localhost:3002/cancreate`,{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
                    if(res.data==="yes")
                        this.setState({error:"no"})
                    else
                        this.setState({error:"yes"})
            })
          }
        })
       
        Axios.get(`http://localhost:3002/user`,{withCredentials:true}).then(res=>{
            if(res.status===200){
                Axios.get(`http://localhost:3002/name`,{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
                    if(res.status===200)
                        this.setState({name:res.data.user.name});
                })
            }
        })
    }

    render(){
        console.log(this.state.error);
        if(this.state.error === "no"){
            return(
                <Redirect to='/admindashboard'/>
            )
        }
        else{
            if(this.state.type === ""){
            return(
                <div style={{textAlign:"center",marginTop:"7em"}}>
                <h1>Welcome back {this.state.name}</h1>
                <div style={{paddingLeft:"2%"}}>
                    <Button onClick={()=>{this.setState({type:"ongoing_projects"})}} bsStyle="info">Ongoing</Button>
                    <Button onClick={()=>{this.setState({type:"projects_completed"})}} bsStyle="success">Completed</Button>
                    </div>
                </div>
            )
            }
            else{
                return(
                    <div style={{marginTop:"7em",justifyContent:"center"}}>
                    <h1 style={{textAlign:"center"}}>Welcome home {this.state.name}</h1>
                    <div style={{paddingLeft:"2%"}}>
                    <Button onClick={()=>{this.setState({type:"ongoing_projects"})}} bsStyle="info">Ongoing</Button>
                    <Button onClick={()=>{this.setState({type:"projects_completed"})}} bsStyle="success">Completed</Button>
                    </div>
                    <ShowTable2 type={this.state.type}/>
                </div>
                )
            }
        }
    }
}
export default DeveloperDashoard;