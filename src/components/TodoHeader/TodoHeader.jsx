import React from 'react';
import MenuAppBar from './AppBar';
import './TodoHeader.sass';


class TodoHeader extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
     
    }
   
  }



  render(){
    return(
      <div>
        <MenuAppBar />
      </div>
    )
  }
}

export default TodoHeader;