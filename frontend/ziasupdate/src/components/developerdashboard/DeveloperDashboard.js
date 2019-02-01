import React from 'react'
import Axios from 'axios';

class DeveloperDashoard extends React.Component{
    constructor(props){
        super(props);
        this.state={name:"",error:""};

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
            <div style={{textAlign:"center",marginTop:"7em"}}>
            <h1>You are not Developer</h1>
            </div>
            )
        }
        else{
            return(
                <div style={{textAlign:"center",marginTop:"7em"}}>
                <h1>Welcome back {this.state.name}</h1>
                </div>
            )
        }
    }
}
export default DeveloperDashoard;