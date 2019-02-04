import React from 'react';
import Axios from 'axios';
import remove from '../assets/remove.png';
import info from '../assets/info.png';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class DeveloperinProject extends React.Component{
    constructor(props){
        super(props);
        this.delete=this.delete.bind(this)
        this.state={data:[]}
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
                onClick: () => { Axios.delete(`http://localhost:3002/deletedevfromproject/${id}/${this.props.proid}`)}
              },
              {
                label: 'No',
                onClick: () => console.log("yes")
              }
            ]
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
                    <img onClick={()=>this.delete(i.devid,i.name)} height="5%" width="5%" src={remove}/>
                    <h6>{i.currentStatus}</h6>
                    <a href={`/developerdetail/${i.devid}/${this.props.proid}`}><img height="30%" width="20%" src={info}/></a>
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
export default DeveloperinProject;