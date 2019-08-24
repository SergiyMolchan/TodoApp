import React from 'react';
import PropTypes from 'prop-types';
import MenuAppBar from './AppBar';
import './TodoHeader.sass';


class TodoHeader extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
     stats:{
      all: 0,
      completed: 0,
      actively: 0
     }
    }
  
    this.StatisticsСalculation = this.StatisticsСalculation.bind(this);

  }

  StatisticsСalculation = () => {
    let stats = {
      all: 0,
      completed: 0,
      actively: 0
     };

    stats.all = this.props.tasks.length;

    for(let i = 0; i < this.props.tasks.length; i++){
      if(this.props.tasks[i].completed === true){
        stats.completed++;
      }
    }

    stats.actively = stats.all - stats.completed;

    this.setState({stats});

  }


  render(){
    return(
      <div>
        <MenuAppBar
          onCalculate={this.StatisticsСalculation}
          stats={this.state.stats}
        />
      </div>
    )
  }
}

TodoHeader.protTypes = {
  onCalculate: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired
 }
 

export default TodoHeader;