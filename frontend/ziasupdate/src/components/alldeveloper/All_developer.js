import React from 'react';
import Axios from 'axios';
import info from '../assets/info.png';


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

    render(){
        const developer=this.state.data.map(i=>{
            return(<div style={{margin:"6% 12%",border:"1px solid black",width:"fit-content",height:"fit-content",padding:"1% 1%"}}>
                <h1>{i.name}</h1>
                <a href={`/developerdetail/${i._id}`}><img height="30%" width="20%" src={info}/></a>
            </div>)
        })
        return(<>{developer}</>)
    }
}
export default All_developers;