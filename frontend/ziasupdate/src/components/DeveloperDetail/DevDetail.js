import React from 'react';
import Axios from 'axios';
import remove from '../assets/remove.png';
import info from '../assets/info.png';
import './dev.css';

class DevDetail2 extends React.Component{
    constructor(props){
        super(props);
        this.state={data:[]}
        Axios.get(`http://localhost:3002/developerdetail/${this.props.match.params.devid}`).then(res=>{
            this.setState({data:res.data});
            console.log(this.state.data)
        })
    }

    render(){
        console.log(this.state.data);
        return(
            <div style={{marginTop:"7em",justifyContentL:"center"}}>
                    <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the Developer :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.name}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Contact of the developer :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.contactNo}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>EmailId of the developer :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.email}</h4> 
                      </div><br/>
                    </div>
        )
    }
}


class DevDetail1 extends React.Component{
    constructor(props){
        super(props);
        this.state={data:[],showproject:""}
        Axios.get(`http://localhost:3002/developerdetail/${this.props.match.params.devid}`).then(res=>{
            this.setState({data:res.data});
            console.log(this.state.data)
        })
        this.ongoingproject=this.ongoingproject.bind(this);
        this.showprojects=this.showprojects.bind(this);
    }

    showprojects(){
        this.setState({showproject:"complete"})
    }
    ongoingproject(){
        this.setState({showproject:'ongoing'})
    }

    render(){
            console.log(this.state.data);
        if(this.state.showproject===""){
        return(
            <div style={{marginTop:"7em",justifyContentL:"center"}}>
                    <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the Developer :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.name}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Contact of the developer :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.contactNo}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>EmailId of the developer :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.email}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.ongoingproject}>Click to See Ongoing_projects of {this.state.data.name}</button>
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.showprojects}>Click to See Completed Projects of {this.state.data.name}</button>
                      </div><br/>
                    </div>
        )}
        else if(this.state.showproject==="complete"){
            var projects;
            if(this.state.data.projects_completed.length===0)
                projects=<h1 style={{textAlign:'center'}}>"Nothing to show"</h1>
            else
                projects=this.state.data.projects_completed.map(i=>{
                    return(
                        <div style={{marginLeft:'30%'}} className="pro">
                        <h1>{i.name}</h1>
                        <img height="5%" width="5%" src={remove}/>
                        <a href={`/ProjectDetail/${i.proid}`}><img height="30%" width="20%" src={info}/></a>
                    </div>
                     )
                })
            return(
                <div style={{marginTop:"7em",justifyContentL:"center"}}>
                <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the Developer :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.name}</h4> 
                  </div><br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Contact of the developer :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.contactNo}</h4> 
                  </div><br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>EmailId of the developer :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.email}</h4> 
                  </div><br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.ongoingproject}>Click to See Ongoing_projects of {this.state.data.name}</button>
                  </div><br/>
                {projects}
            </div>
            )
        }
        else if(this.state.showproject==="ongoing"){
            console.log(this.state.data.ongoing_projects)
            var ongoing=this.state.data.ongoing_projects.map(i=>{
                return(
                <div style={{marginLeft:'30%'}} className="pro">
                <h1>{i.name}</h1>
                <a href={`/ProjectDetail/${i.proid}`}><img height="30%" width="20%" src={info}/></a>
            </div>
                )
            })
            return(
                <div style={{marginTop:"7em",justifyContentL:"center"}}>
                <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the Developer :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.name}</h4> 
                  </div><br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Contact of the developer :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.contactNo}</h4> 
                  </div><br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>EmailId of the developer :</h4>
                 <h4 style={{color:"red"}}>{this.state.data.email}</h4> 
                  </div><br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.showprojects}>Click to See Comleted of {this.state.data.name}</button>
                  </div><br/>
                    {ongoing}
                </div>
            )
        }
    }
}

export  {DevDetail1,DevDetail2};