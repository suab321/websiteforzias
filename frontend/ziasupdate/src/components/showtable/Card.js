import React from 'react';


  //admin Card
class Card1 extends React.Component{
  constructor(props){
    super(props);
  }
render() {
  return (
    <div style={{border:"1px solid black",width:"fit-content",marginTop:"2em",marginLeft:"26%",padding:"2% 2%"}}>
    <a href={`/projectdetail/${this.props.i._id}`}><h1>{this.props.i.name}</h1></a>
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
