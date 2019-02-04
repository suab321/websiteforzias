import React from 'react';
import Axios from 'axios';
import remove from '../assets/remove.png';
import info from '../assets/info.png';

class DevDetail extends React.Component{
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
        this.setState({showproject:"ongoing"})
    }

    render(){
            console.log(this.state.data);
        if(this.state.showproject===""){
        return(
            <div style={{justifyContent:"center",marginTop:"10em",textAlign:"center"}}>
                <div style={{display:"flex"}}><h1>Name: </h1>
                <h2>{this.state.data.name}</h2></div><br/>
                <div style={{display:"flex"}}><h1>Skills: </h1>
                <h2>{this.state.data.skills}</h2></div><br/>
                <div style={{display:"flex"}}><h1>status: </h1>
                <h2>{this.state.data.status}</h2></div><br/>
                <div style={{display:"flex"}}><h1>Contact: </h1>
                <h2>{this.state.data.contactNo}</h2></div><br/>
                <button onClick={this.showprojects}>Show completed Projects</button>
                <button onClick={this.ongoingproject}>Show Ongoing_projects Projects</button>
            </div>
        )
        }
        else if(this.state.showproject==="complete"){
            var projects;
            if(this.state.data.projects_completed.length===0)
                projects="Nothing to show";
            else
                projects=this.state.data.projects_completed.map(i=>{
                    return(
                        <div style={{justifyContent:"center",display:"flex",border:"1px solid black",width:"fit-content",height:"fit-content"}}>
                        <h1>{i.name}</h1>
                        <img height="5%" width="5%" src={remove}/>
                        <a href={`/ProjectDetail/${i.proid}`}><img height="30%" width="20%" src={info}/></a>
                    </div>
                     )
                })
            return(
            <div style={{justifyContent:"center",marginTop:"10em",textAlign:"center"}}>
                <div style={{display:"flex"}}><h1>Name: </h1>
                <h2>{this.state.data.name}</h2></div><br/>
                <div style={{display:"flex"}}><h1>Skills: </h1>
                <h2>{this.state.data.skills}</h2></div><br/>
                <div style={{display:"flex"}}><h1>status: </h1>
                <h2>{this.state.data.status}</h2></div><br/>
                <div style={{display:"flex"}}><h1>Contact: </h1>
                <h2>{this.state.data.contactNo}</h2></div><br/>
                <button onClick={this.ongoingproject}>Show Ongoing Projects</button><br/>
                {projects}
            </div>
            )
        }
        else if(this.state.showproject==="ongoing"){
            console.log(this.state.data.ongoing_projects)
            var ongoing=this.state.data.ongoing_projects.map(i=>{
                return(
                <div style={{justifyContent:"center",display:"flex",border:"1px solid black",width:"fit-content",height:"fit-content"}}>
                <h1>{i.name}</h1>
                <img height="5%" width="5%" src={remove}/>
                <a href={`/ProjectDetail/${i.proid}`}><img height="30%" width="20%" src={info}/></a>
            </div>
                )
            })
            return(
                <div style={{justifyContent:"center",marginTop:"10em",textAlign:"center"}}>
                    <div style={{display:"flex"}}><h1>Name: </h1>
                    <h2>{this.state.data.name}</h2></div><br/>
                    <div style={{display:"flex"}}><h1>Skills: </h1>
                    <h2>{this.state.data.skills}</h2></div><br/>
                    <div style={{display:"flex"}}><h1>status: </h1>
                    <h2>{this.state.data.status}</h2></div><br/>
                    <div style={{display:"flex"}}><h1>Contact: </h1>
                    <h2>{this.state.data.contactNo}</h2></div><br/>
                    <button onClick={this.showprojects}>Show completed Projects</button>
                    {ongoing}
                </div>
            )
        }
    }
}
export default DevDetail;