import axios from 'axios';
import React, {useState, useEffect} from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import NewTaskForm from './components/NewTaskForm.js';

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
    axios.get('http://localhost:5000/tasks')
      .then((res) => setTaskData(() => {
        return taskDataConvert(res.data);}))
      .catch((err) => console.log(err));
  }, []);

  const updateTaskData = (updatedTask) => {
    setTaskData(tasks => {
      return tasks.map(task => {
        if (updatedTask.id === task.id) {
          return {
            ...task,
            isComplete: !task.isComplete,
          };
        } else {
          return task;
        }
      });
    });

    const completeEndpoint = updatedTask.isComplete ? 'mark_complete' : 'mark_incomplete';

    axios.patch(`http://localhost:5000/tasks/${updatedTask.id}/${completeEndpoint}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const removeTaskData = (id) => {
    setTaskData(tasks => {
      return tasks.filter(task => task.id !== id);
    });
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (data) => {
    axios.post('http://localhost:5000/tasks', data)
      .then((res) => {
        const convertedTask = taskDataConvert([res.data.task, ...taskData]);
        return setTaskData(convertedTask);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <NewTaskForm onHandleSubmit={handleSubmit} />
          <TaskList tasks={taskData} onUpdateTaskData={updateTaskData} onRemoveTaskData={removeTaskData} />
        </div>
      </main>
    </div>
  );
};

export default App;
