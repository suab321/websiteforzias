import React from 'react';
import remove from '../assets/remove.png'
import Axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


  //admin Card
class Card1 extends React.Component{
  constructor(props){
    super(props);
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


render() {
  return (
    <div style={{border:"1px solid black",width:"fit-content",marginTop:"2em",marginLeft:"26%",padding:"2% 2%"}}>
    <a href={`/projectdetail/${this.props.i._id}`}><h1>{this.props.i.name}</h1></a>
    <img onClick={()=>{this.remove(this.props.i._id,this.props.i.name)}} src={remove} height="20%" width="20%"/>
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
