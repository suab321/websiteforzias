import React from 'react';
import 'react-table/react-table.css';
import Axios from 'axios';
import {Card1} from './Card';
import {Card2} from './Card';

class ShowTable1 extends React.Component{

    constructor(props){
        super(props);
        this.state={data:[]};
        Axios.get('http://localhost:3002/user',{withCredentials:true}).then(res=>{
            if(res.status===200){
                Axios.get(`http://localhost:3002/project/${this.props.type}`,{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
                    if(res.data.length!==0)
                        this.setState({data:res.data})
                })
            }
        })
        
    }

    render(){
        const card=this.state.data.map(i=>{
            return(
                <Card1 i={i}/> 
            )
        })
        return(
       <div style={{display:"center"}}>
        {card}
       </div>
        )
    }
}


//developers Showtable
class ShowTable2 extends React.Component{

    constructor(props){
        super(props);
        this.state={data:[]};
        Axios.get('http://localhost:3002/user',{withCredentials:true}).then(res=>{
            if(res.status===200){
                Axios.get(`http://localhost:3002/getproject/${this.props.type}`,{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
                    if(res.data!=="No projects")
                        this.setState({data:res.data})
                })
            }
        })
    }



    render(){
        let card=null;
        if(this.state.data.length){
         card=this.state.data.map(i=>{
            return(
                <Card2 i={i}/> 
            )
        })
    }
        if(card!==null){
        return(
       <div style={{display:"center"}}>
        {card}
       </div>
        )
        }
        else{
            return(
            <div style={{display:"center"}}>
            <h1>No projects</h1>
            </div>
            )
        }
    }
}
export{ShowTable1,ShowTable2}