import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  const onUpdateButtonClick = () => {
    props.onUpdateTaskData(props.id);
  };

  const onRemoveButtonClick = () => {
    props.onRemoveTaskData(props.id);
  };

  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={onUpdateButtonClick}
      >
        {props.title}
      </button>
      <button 
        className="tasks__item__remove button"
        onClick={onRemoveButtonClick}
      >x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onUpdateTaskData: PropTypes.func.isRequired,
  onRemoveTaskData: PropTypes.func.isRequired,
};

export default Task;
