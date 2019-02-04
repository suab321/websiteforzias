import React from 'react';
import Axios from 'axios';

class ProjectforDev extends React.Component{
    constructor(props){
        super(props);
        this.state={data:null,read:false};
        this.update=this.update.bind(this);
        this.edit=this.edit.bind(this);
        this.input=React.createRef();
        Axios.get('http://localhost:3002/user',{withCredentials:true}).then(res=>{
            if(res.status===200){
                Axios.get(`http://localhost:3002/getstatus/${this.props.match.params.proid}`,{headers:{Authorization: `Bearer ${res.data}`}})
                .then(res=>{
                    this.setState({data:res.data[0].currentStatus})
                })
            }
        })
       
    }

    update(){
        Axios.get(`http://localhost:3002/user`,{withCredentials:true}).then(res=>{
            if(res.status===200)
            {
                Axios.post(`http://localhost:3002/updatestatus/${this.props.match.params.proid}`,{status:"yeah"},{headers:{Authorization: `Bearer ${res.data}`}})
            }
        })
    }
    edit(){
       this.setState({read:false})
    }

    render(){
        return(
            <div style={{marginTop:'7em'}}>
                <label>Status</label>
                <input type="text" placeholder={this.state.data} />
                <button onClick={this.edit}>Click to edit your status</button>
                <button onClick={this.update}>Set Status</button>
            </div>
        )
    }
}
export default ProjectforDev;
