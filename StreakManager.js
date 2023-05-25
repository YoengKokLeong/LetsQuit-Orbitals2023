import DateList from "./DateList";
import EmptyState from "./EmptyState";

import { useState } from "react";

export default function StreakManager({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState("");

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    setTasks([
      {
        task: newTask,
        completed: false
      },
      ...tasks
    ]);
    setNewTask("");
  };

  const handleTaskChange = (i) => {
    setTasks([
      ...tasks.slice(0, i),
      {
        task: tasks[i].task,
        completed: !tasks[i].completed
      },
      ...tasks.slice(i + 1)
    ]);
  };

  return (
    <main>
      <h2>Stamp another day of not relapsing! </h2>
      <form>
        <input type="text" value={newTask} onChange={handleNewTaskChange} />
        <button type="submit" onClick={handleNewTaskSubmit}>
          Add
        </button>
      </form>
      {tasks.length > 0 ? (
        <DateList tasks={tasks} onTaskChange={handleTaskChange} />
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
