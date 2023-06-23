import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = (props) => {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);

    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const newTask = {
            title: name,
            // description can't be empty string
            description: ' ',
            isComplete: false,
        };

        props.onHandleSubmit(newTask);

        setName('');
    };

    return (
        <form className="task_form" onSubmit={handleFormSubmit}>
            <label htmlFor="name" className="form_title">Task Title:</label>
            <input 
                type="text" 
                id="name" 
                name="taskTitle"
                value={name}
                onChange={handleNameChange}
            />
            <input type="submit" value="Add Task" />
        </form>
    );
};

NewTaskForm.propTypes = {
    onHandleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;