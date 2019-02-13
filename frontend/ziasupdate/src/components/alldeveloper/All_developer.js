import React from 'react';
import Axios from 'axios';
import info from '../assets/info.png';
import remove from '../assets/remove.png';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../showtable/showtable.css';


class All_developers extends React.Component{
    constructor(props){
        super(props);
        this.state={data:[]}
        Axios.get('http://localhost:3002/user',{withCredentials:true}).then(res=>{
            Axios.get('http://localhost:3002/getalldeveloper',{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
                this.setState({data:res.data});
            })
        })
    }

    remove(id,name){
        console.log(id,name);
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
                      Axios.delete(`http://localhost:3002/removedeveloper/${id}`,{headers:{Authorization: `Bearer ${res.data}`}})
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

    render(){
        const developer=this.state.data.map(i=>{
            return(<div style={{marginTop:'7em'}} className="developers_card">
                <h1>{i.name}</h1>
                <a href={`/developerdetail/${i._id}`}><img height="7%" width="7%" src={info}/></a>
                <img onClick={()=>{this.remove(i._id,i.name)}} height="7%" width="7%" src={remove}/>
            </div>)
        })
        return(<>{developer}</>)
    }
}
export default All_developers;