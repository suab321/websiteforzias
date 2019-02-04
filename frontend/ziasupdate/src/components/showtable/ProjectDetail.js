import React from 'react'
import Axios from 'axios';
import DeveloperinProject from './DeveloperinProject';

class ProjectDetail extends React.Component{
    constructor(props){
        super(props);
        this.developer=this.developer.bind(this);
        this.state={data:[],showdeveloper:false}
        Axios.get('http://localhost:3002/user',{withCredentials:true})
        .then(res=>{
            if(res.status===200){
                Axios.get(`http://localhost:3002/projectdetail/${this.props.match.params.id}`,{headers:{Authorization: `Bearer ${res.data}`}})
                .then(res=>{
                    if(res.status=200)
                        this.setState({data:res.data});
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

    render(){
        if(this.state.showdeveloper){
            return(
                <div style={{marginTop:"7em",justifyContentL:"center"}}>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.name}</h4> 
                  </div><br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Details of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.details}</h4> 
                  </div> <br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Start Date of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.startdate}</h4> 
                  </div>  <br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>End Date of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.enddate}</h4> 
                  </div><br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.developer}>Click to hide</button>
                  </div><br/>
                  <DeveloperinProject style={{justifyContent:"center"}} proid={this.props.match.params.id}/>   
                </div>
                )
        }
        else{
            return(
                <div style={{marginTop:"7em",justifyContentL:"center"}}>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.name}</h4> 
                  </div><br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Details of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.details}</h4> 
                  </div> <br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Start Date of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.startdate}</h4> 
                  </div>  <br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>End Date of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.enddate}</h4> 
                  </div><br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.developer}>Click to see the developers of project</button>
                  </div> <br/>   
                </div>
            )
        }
    }
}
export default ProjectDetail;