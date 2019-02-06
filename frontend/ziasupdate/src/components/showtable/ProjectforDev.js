import React from 'react';
import Axios from 'axios';
import {DeveloperinProject2} from './DeveloperinProject';


class ProjectforDev extends React.Component{
    constructor(props){
        super(props);
        this.state={data:null,read:false,prodetail:[],showdeveloper:false,};
        this.update=this.update.bind(this);
        this.developer=this.developer.bind(this);
        this.edit=this.edit.bind(this);
        this.input=React.createRef();
        Axios.get('http://localhost:3002/user',{withCredentials:true}).then(res=>{
            if(res.status===200){
                Axios.get(`http://localhost:3002/getstatus/${this.props.match.params.proid}`,{headers:{Authorization: `Bearer ${res.data}`}})
                .then(res=>{
                    this.setState({data:res.data[0].currentStatus})
                })
                Axios.get(`http://localhost:3002/projectdetailfordev/${this.props.match.params.proid}`,{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
                    if(res.status===200)
                        this.setState({prodetail:res.data});
                })
            }
        })  
    }
    developer(){
        if(this.state.showdeveloper)
            this.setState({showdeveloper:false});
        else
            this.setState({showdeveloper:true});
    }

    update(){
        console.log();
        this.input.current.readOnly=false;
        Axios.get(`http://localhost:3002/user`,{withCredentials:true}).then(res=>{
            if(res.status===200)
            {
                Axios.put(`http://localhost:3002/updatestatus/${this.props.match.params.proid}`,{status:`${this.input.current.value}`},{headers:{Authorization: `Bearer ${res.data}`}})
            }
        })
    }
    edit(){
        this.input.current.readOnly=false;
       this.setState({read:false})
    }

    render(){
        if(this.state.showdeveloper){
        return(
            <div style={{marginTop:'7em'}}>
            <div style={{marginTop:"7em",justifyContentL:"center"}}>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Details of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.prodetail.details}</h4> 
                  </div> <br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.developer}>Click to hide</button>
                  </div><br/>
                  <DeveloperinProject2 style={{justifyContent:"center"}} proid={this.props.match.params.proid}/>   
                </div>
            <div>

            </div>
                <label>Status</label>
                <input type="text" ref={this.input} readOnly={true} placeholder={this.state.data} />
                <button onClick={this.edit}>Click to edit your status</button>
                <button onClick={this.update}>Set Status</button>
            </div>
        )
        }
        else{
            return(
                <div style={{marginTop:'7em'}}>
                <div style={{marginTop:"7em",justifyContentL:"center"}}>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Details of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.prodetail.details}</h4> 
                      </div> <br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.developer}>Click to see the developers of project</button>
                      </div><br/>
                    </div>
                <div>
    
                </div>
                    <label>Status</label>
                    <input type="text" ref={this.input} readOnly={true} placeholder={this.state.data} />
                    <button onClick={this.edit}>Click to edit your status</button>
                    <button onClick={this.update}>Set Status</button>
                </div>
            )
        }
    }
}
export default ProjectforDev;
