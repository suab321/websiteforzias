import React from 'react';
import Axios from 'axios';

class NewProjrct extends React.Component{
    constructor(){
        super();
        this.name=React.createRef();
        this.detail=React.createRef()
        this.startdate=React.createRef();
        this.enddate=React.createRef();
        this.create=this.create.bind(this);
        this.state={error:1};
        Axios.get('http://localhost:3002/user',{withCredentials:true}).then(res=>{
            if(res.status===200){
                Axios.get(`http://localhost:3002/cancreate/${res.data}`)
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
            Axios.post('http://localhost:3002/createproject',{name:this.name.current.value
                    ,details:this.detail.current.value,startdate:this.startdate.current.value,enddate:this.enddate.current.value})
            }

        console.log(this.name.current.value);
        console.log(this.detail.current.value);
        console.log(this.startdate.current.value);
        console.log(this.enddate.current.value);
    }
    render(){
        if(this.state.error){
        return(
            <div style={{textAlign:"center"}}>
				<div class='form'>
				<div>
				<label style={{fontSize: "2em"}}>New Project</label><br/><br/><br/>
				<img src="https://s3.amazonaws.com/thumbnails.illustrationsource.com/huge.102.513291.JPG" alt="" width="200px" height="200px"/><br/><br/>
				<h2 style={{color:"red"}}>You are not an admin hence you can cannot create project or add user!</h2>
                <label>Name</label><br/><br/>
				<input ref={this.name} type="text"/><br/><br/>
                <label>Details</label><br/><br/>
				<textarea ref={this.detail} style={{width:"100%"}} type="text"required placeholder="little detail of project"></textarea><br/><br/>
				<label>Start Date</label><br/><br/>
				<input ref={this.startdate} type="text" required /><br/><br/>
                <label>Deadline</label><br/><br/>
				<input ref={this.enddate} type="text" required /><br/><br/>
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
				<label>Name</label><br/><br/>
				<input ref={this.name} type="text"/><br/><br/>
                <label>Details</label><br/><br/>
				<textarea ref={this.detail} style={{width:"100%"}} type="text"required placeholder="little detail of project"></textarea><br/><br/>
				<label>Start Date</label><br/><br/>
				<input ref={this.startdate} type="text" required /><br/><br/>
                <label>Deadline</label><br/><br/>
				<input ref={this.enddate} type="text" required /><br/><br/>
				<button style={{cursor: "pointer",fontSize: "1em"}} onClick={this.create}>Create</button><br/><br/>
				</div>
				</div>
            </div>
        )
      }
    }
}
export default NewProjrct;