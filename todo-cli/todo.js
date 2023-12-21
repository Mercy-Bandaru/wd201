const taskManager = () => {
  const tasksList = [];

  const formatDate = (date) => {
    const dateCopy = new Date(date);
    return dateCopy.toISOString().split("T")[0];
  };

  const currentDate = new Date();
  const today = formatDate(currentDate);

  const addTask = (task) => {
    tasksList.push(task);
  };

  const completeTask = (index) => {
    tasksList[index].completed = true;
  };

  const getOverdueTasks = () => {
    return tasksList.filter((task) => !task.completed && task.dueDate < today);
  };

  const getTasksDueToday = () => {
    return tasksList.filter((task) => task.dueDate === today);
  };

  const getTasksDueLater = () => {
    return tasksList.filter((task) => !task.completed && task.dueDate > today);
  };

  const formatDisplayableList = (list) => {
    let displayableList = "";

    list.forEach((task) => {
      const checkbox = task.completed ? "[x]" : "[ ]";
      const date = task.dueDate === today ? "" : ` ${task.dueDate}`;
      displayableList += `${checkbox} ${task.title}${date}\n`;
    });

    return displayableList.trim();
  };

  return {
    all: tasksList,
    add: addTask,
    complete: completeTask,
    overdue: getOverdueTasks,
    dueToday: getTasksDueToday,
    dueLater: getTasksDueLater,
    toDisplayableList: formatDisplayableList,
  };
};

module.exports = taskManager;
