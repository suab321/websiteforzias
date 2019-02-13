import React from 'react';
import remove from '../assets/remove.png'
import Axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import edit from '../assets/edit.png';
import Modal from 'react-modal';
import './showtable.css';

  //admin Card
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : '',
      bottom                : 'auto',
      marginRight           : '',
      transform             : 'translate(-50%, -50%)'
    }
  };
class Card1 extends React.Component{
  constructor(props){
    super(props);
    this.state={isModalOpen:false,id:''};
    this.edit=this.edit.bind(this);
    this.confirmedit=this.confirmedit.bind(this);
    this.detailref=React.createRef();
    this.dateref=React.createRef();
    this.remove=this.remove.bind(this);
  }
  
  remove(id,name){
    confirmAlert({
      title: 'Confirm to submit',
      message: `Are you sure to remove project ${name}`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => { 
           this.setState({delete:1})
           Axios.get(`http://localhost:3002/user`,{withCredentials:true}).then(res=>{
               if(res.status===200){
                  Axios.delete(`http://localhost:3002/removeproject/${id}`,{headers:{Authorization: `Bearer ${res.data}`}})
               }
           }).catch(err=>alert(err));
          }
        },
        {
          label: 'No',
          onClick: () => console.log("yes")
        }
      ]
    })
  }
  edit(id){
    this.setState({isModalOpen:true,id:id})
}
  confirmedit(){
    Axios.get('http://localhost:3002/user',{withCredentials:true}).then(res=>{
      if(res.status === 200 || res.status === 304){
        Axios.put(`http://localhost:3002/updateprojects/${this.state.id}`,{details:this.detailref.current.value,enddate:this.dateref.current.value},{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
      })
    }
  })
}
  


render() {
  return (
    <div className="projects_card">
    <a style={{textAlign:'center'}} href={`/projectdetail/${this.props.i._id}`}><h1>{this.props.i.name}</h1></a>
    <img style={{paddingRight:'3%',cursor:'pointer'}} onClick={()=>{this.remove(this.props.i._id,this.props.i.name)}} src={remove} height="7%" width="7%"/>
    <img style={{cursor:'pointer'}} onClick={()=>{this.edit(this.props.i._id)}} src={edit} height="7%" width="7%"/>
    <Modal
          isOpen={this.state.isModalOpen}
          style={customStyles}
        >
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <button onClick={()=>{this.setState({isModalOpen:false})}}>close</button>
          <div>Update Project Details</div>
          <div>
            <input ref={this.detailref} placeholder="enter the details" />
            <input ref={this.dateref} placeholder="enter the deadline" />
            <button onClick={this.confirmedit}>Update</button>
          </div>
        </Modal>
    </div>
    );
  };
}


//developers Card
class Card2 extends React.Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div style={{border:"1px solid black",width:"fit-content",marginTop:"2em",marginLeft:"26%",padding:"2% 2%"}}>
      <a href={`/mypro/${this.props.i.proid}`}><h1>{this.props.i.name}</h1></a>
      </div>
    );
  };
  }
  
  export{
    Card1,
    Card2
  }
