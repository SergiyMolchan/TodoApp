import React from 'react';
import PropTypes from 'prop-types';
import './Todo.sass';

export function Stats(props) {

  let all = props.tasks.length;
  let completed = props.tasks.filter(task => task.completed).length;
  let actively = all - completed;

  return(
    <div className="Stats">
      <p>{`Tasks all: ${all}`}</p>
      <p>{`Completed: ${completed}`}</p>
      <p>{`Actively: ${actively}`}</p>
    </div>
  )
}

Stats.protTypes = {
  tasks: PropTypes.array.isRequired
 }