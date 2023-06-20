import axios from 'axios';
import React, {useState, useEffect} from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const App = () => {
  
  const [taskData, setTaskData] = useState([]);

  const taskDataConvert = (res) => {
    return res.map((task) => {
      return {
        ...task,
        isComplete: task.is_complete,
      };
    });
  };

  useEffect(() => {
    axios.get('https://task-list-api-c17.onrender.com/tasks')
      .then((res) => setTaskData(() => taskDataConvert(res.data)))
      .catch((err) => console.log(err));
  }, []);

  const updateTaskData = (id) => {
    setTaskData(tasks => {
      return tasks.map(task => {
        if (id === task.id) {
          return {
            ...task,
            isComplete: !task.isComplete,
          };
        } else {
          return task;
        }
      });
    });
  };

  const removeTaskData = (id) => {
    setTaskData(tasks => {
      return tasks.filter(task => task.id !== id);
    });
    axios.delete(`https://task-list-api-c17.onrender.com/tasks/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList tasks={taskData} onUpdateTaskData={updateTaskData} onRemoveTaskData={removeTaskData} />
        </div>
      </main>
    </div>
  );
};

export default App;
