import { useEffect, useState } from "react";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [filter, setFilter] = useState("all");
  const [filteredArray, setFilterArray] = useState([]);

  const addTask = () => {
    if (taskInput.trim() === "") return;

    setTaskInput("");
    setTaskList((prev) => [...prev, { text: taskInput, completed: false }]);
  };

  const markCompleted = (bool, index) => {
    if (!bool) return;

    let tasks = taskList;
    tasks[index].completed = !tasks[index].completed;
    setTaskList((prev) => {
      const newTasks = [...prev];
      newTasks[index] = { ...newTasks[index], completed: bool };
      return newTasks;
    });
  };

  const removeTask = (index) => {
    setTaskList((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
    
    console.log(filter)
    setFilterArray(() =>
      taskList.filter(task => {
        if (filter === "all") return true;
        if (filter === "completed") return task.completed;
        if (filter === "inCompleted") return !task.completed;
      })
    )
  }, [taskList, filter]);

  return (
    <div className="bg-light h-[100dvh] flex items-center justify-center dark:bg-slate-700 md:bg-none bg-slate-100">
      <div className="w-[100vw] md:w-[35vw] h-[100dvh] md:h-[85dvh] md:bg-slate-100 md:border border-slate-300  md:dark:bg-slate-700 md:dark:border-slate-600  shadow-lg rounded-lg">
        <h1 className="text-center py-4 text-2xl font-semibold text-slate-800 dark:text-slate-50 border-b border-slate-300">
          Let's Get Productive
        </h1>
        <div className="px-6 py-4">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Add task
          </label>
          <div className="relative">
            <input
              type="text"
              value={taskInput || ""}
              className="block w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add task"
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={addTask}
            >
              Add
            </button>
          </div>
          {/* list */}
          <div className="my-4 text-sm dark:text-text-dark text-right w-max-3">
            <select onChange={(e) => setFilter(e.target.value)} name="filter" id="filter">
              <option  value="all" className="text-xs">
                All
              </option>
              <option value="completed" className="text-xs">
                Completed
              </option>
              <option value="inCompleted" className="text-xs">
                In Complete
              </option>
            </select>
          </div>
          <ul className="space-y-2 mt-4">
            {/* Example Task - Active */}
            {filteredArray.length > 0 ? (
              filteredArray.map((task, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-slate-600 px-3 py-2 rounded border border-slate-200 dark:border-slate-500"
                >
                  <div className="flex items-center gap-2">
                    <input
                      onChange={(e) => markCompleted(e.target.checked, index)}
                      checked={task.completed}
                      type="checkbox"
                      className="accent-blue-500 w-4 h-4"
                    />
                    <span
                      className={
                        task.completed
                          ? "line-through text-slate-400"
                          : "text-slate-800 dark:text-slate-50"
                      }
                    >
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => removeTask(index)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center py-6 text-xl text-text-light dark:text-text-dark">
                No tasks for today
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
