import React from 'react';
import Axios from 'axios';

class DeveloperDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={name:""};
    }
   componentWillMount(){
        Axios.get('http://localhost:3002/user',{withCredentials:true}).then(res=>{
            if(res.status===200)
                Axios.get('http://localhost:3002/name',{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
                  this.setState({name:res.data.user.name})
                })
        })
    }
    render(){
        console.log(this.state.name)
        return(
            <div style={{marginTop:"7em",justifyContent:"center"}}>
                <h1 style={{textAlign:"center"}}>Welcome home {this.state.name}</h1>
            </div>
        )
    }
}
export default DeveloperDashboard;