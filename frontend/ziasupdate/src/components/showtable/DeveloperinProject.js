import React from 'react';
import Axios from 'axios';
import remove from '../assets/remove.png';
import info from '../assets/info.png';

class DeveloperinProject extends React.Component{
    constructor(props){
        super(props);
        this.state={data:[],err:0}
        Axios.get(`http://localhost:3002/getdeveloperinproject/${this.props.id}`).then(res=>{
            this.setState({data:res.data.developers}) 
            })
    }
    render(){
        const developers=this.state.data.map(i=>{
            return(
                <div style={{justifyContent:"center",display:"flex",border:"1px solid black",width:"fit-content",height:"fit-content",}}>
                    <h1>{i.name}</h1>
                    <img height="5%" width="5%" src={remove}/>
                    <a href={`/developerdetail/${i.devid}`}><img height="30%" width="20%" src={info}/></a>
                </div>
            )
        })
        return(
           <h1>{developers}</h1>
        )
    }
}
export default DeveloperinProject;