import axios from 'axios';
import React, {useState, useEffect} from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import NewTaskForm from './components/NewTaskForm.js';

const App = () => {
  const kBaseUrl = 'https://task-list-api-3t8h.onrender.com/';

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
    axios.get(`${kBaseUrl}/tasks`)
      .then((res) => setTaskData(taskDataConvert(res.data)))
      .catch((err) => console.log(err));
  }, []);

  const updateTaskData = (updatedTask) => {
    const completeEndpoint = updatedTask.isComplete ? 'mark_complete' : 'mark_incomplete';

    axios.patch(`${kBaseUrl}/tasks/${updatedTask.id}/${completeEndpoint}`)
      .then((res) => setTaskData((prev) => {
        return prev.map(task => {
          if (updatedTask.id === task.id) {
            return {
              ...task,
              isComplete: !task.isComplete,
            };
          } else {
            return task;
          }
        });
      }))
      .catch((err) => console.log(err));
  };

  const removeTaskData = (id) => {
    axios.delete(`${kBaseUrl}/tasks/${id}`)
      .then((res) => setTaskData((prev) => {
        return prev.filter(task => task.id !== id);
      }))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (data) => {
    axios.post(`${kBaseUrl}/tasks`, data)
      .then((res) => setTaskData((prev) => {
        return taskDataConvert([res.data.task, ...prev]);
      }))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Airis&apos; Task List</h1>
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
