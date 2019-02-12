import React from 'react';
import Axios from 'axios';
import remove from '../assets/remove.png';
import info from '../assets/info.png';
import {confirmAlert} from 'react-confirm-alert';
import Modal from 'react-modal';
import 'react-confirm-alert/src/react-confirm-alert.css';



const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class DeveloperinProject1 extends React.Component{
    constructor(props){
        super(props);
        //console.log(Cookies.get('email'));
        this.taskref=React.createRef();
        this.dateref=React.createRef();
        this.showtasks=this.showtasks.bind(this);
        this.closeModal=this.closeModal.bind(this);
        this.delete=this.delete.bind(this);
        this.openmodal=this.openmodal.bind(this);
        this.assign=this.assign.bind(this);
        this.state={data:[],isModalOpen:false,devid:'',showtask:false,tasks:[]}
        Axios.get(`http://localhost:3002/getdeveloperinproject/${this.props.proid}`).then(res=>{
            this.setState({data:res.data.developers}) 
        })
    }

    delete(id,name){
        confirmAlert({
            title: 'Confirm to submit',
            message: `Are you sure to remove ${name}`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => { 
                 this.setState({delete:1})
                 Axios.get(`http://localhost:3002/user`,{withCredentials:true}).then(res=>{
                     if(res.status===200){
                        Axios.delete(`http://localhost:3002/deletedevfromproject/${id}/${this.props.proid}`,{headers:{Authorization: `Bearer ${res.data}`}})
                     }
                 })
                }
              },
              {
                label: 'No',
                onClick: () => console.log("yes")
              }
            ]
          })
    }

    showtasks(i){
        Axios.get(`http://localhost:3002/getprojectstaskforadmin/${this.props.proid}/${i._id}`).then(res=>{
            if(res.status === 200 || 304)
                this.setState({tasks:res.data,showtask:true});
        })  
    }
    yes(){
        this.setState({delete:1})
    }
    no(){
        this.setState({delete:0,show:0});
    }

    openmodal(devid){
        this.setState({isModalOpen:true,devid:devid});
    }
    closeModal(){
        this.setState({isModalOpen:false});
    }
    assign(r1,r2){
        
        Axios.get(`http://localhost:3002/user`,{withCredentials:true}).then(res=>{
            if(res.status === 200){
                Axios.put(`http://localhost:3002/assigntask/${this.props.proid}/${this.state.devid}`,{task:r1.current.value,enddate:r2.current.value,proid:this.props.proid})
            }
        })
    }

    render(){
        const developers=this.state.data.map(i=>{
            return(
                <div style={{justifyContent:"center",display:"flex",border:"1px solid black",width:"fit-content",height:"fit-content",}}>
                    <h1>{i.name}</h1>
                    <img onClick={()=>this.delete(i.devid,i.name)} height="5%" width="5%" src={remove}/>
                    <h6>{i.currentStatus}</h6>
                    <a href={`/developerdetail/${i.devid}`}><img height="30%" width="20%" src={info}/></a>
                    <button onClick={()=>{this.openmodal(i.devid)}}>Assign Task</button>
                    <button onClick={()=>{this.showtasks(i)}}>Tasks</button>
                </div>
            )
        })
        var task=this.state.tasks.map(i=>{
            if(i.iscomplete){
                return(
                    <div style={{background:'green'}}>
                    <h3>Completed Tasks</h3>
                        <div style={{justifyContent:"flex"}}>
                            <h6>task:</h6>{i.task}
                            <button style={{textAlign:"right"}}>mark as incomplete</button>
                        </div>
                        {/* <div style={{justifyContent:"flex"}}>
                            
                        </div> */}
                    </div>
                )
            }
            else{
                return(
                    <div style={{background:'red'}}>
                    <h3>Yet To be Finished Tasks</h3>
                        <div style={{justifyContent:"flex"}}>
                            <h6>task:</h6>{i.task}
                        </div>
                        <div style={{justifyContent:"flex"}}>
                            <h6>endate:</h6>{i.enddate}
                            <button style={{textAlign:"right"}} onClick={()=>{this.mark(1,i)}}>mark as complete</button>
                        </div>
                    </div>
                )
            }
        })
        if(this.state.showtask){
            return(
                <div>{task}</div>
            )
        }
        else{
        return(
            <div>
           <h1>{developers}</h1>
           <div>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <button onClick={this.closeModal}>close</button>
          <div>Assign Task</div>
          <div>
            <input ref={this.taskref} placeholder="enter the task" />
            <input ref={this.dateref} placeholder="enter the deadline" />
            <button onClick={()=>{this.assign(this.taskref,this.dateref)}}>Assign</button>
          </div>
        </Modal>
      </div>
    </div>
        )
        }
    }
}

//DeveloperinProject2
class DeveloperinProject2 extends React.Component{
    constructor(props){
        super(props);
        this.state={data:[]}
        Axios.get(`http://localhost:3002/user`,{withCredentials:true}).then(res=>{
            if(res.status===200){
            Axios.get(`http://localhost:3002/getdeveloperinprojectfordev/${this.props.proid}`,{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
            if(res.status===200)
                this.setState({data:res.data}) 
            })
            }
        })
    }

    yes(){
        this.setState({delete:1})
    }
    no(){
        this.setState({delete:0,show:0});
    }

    render(){
        const developers=this.state.data.map(i=>{
            return(
                <div style={{justifyContent:"center",display:"flex",border:"1px solid black",width:"fit-content",height:"fit-content",}}>
                    <h1>{i.name}</h1>
                    {/* <img onClick={()=>this.delete(i.devid,i.name)} height="5%" width="5%" src={remove}/> */}
                    <h6>{i.currentStatus}</h6>
                    {/* <a href={`/developerdetail/${i.devid}/${this.props.proid}`}><img height="30%" width="20%" src={info}/></a> */}
                </div>
            )
        })
        return(
            <div>
           <h1>{developers}</h1>
           </div>
        )
    }
}

export {DeveloperinProject1,DeveloperinProject2};