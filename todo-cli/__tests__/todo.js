const taskManager = require("../taskManager");
let tasks;

// Setup tasks before each test
beforeEach(() => {
  tasks = taskManager();
});

// Test Suite for TaskManager
describe("TaskManager Test Suite", () => {
  test("Should add a new task", () => {
    const initialTaskCount = tasks.all.length;
    tasks.add({
      title: "Sample task 2",
      completed: false,
      dueDate: "2023-12-20",
    });
    expect(tasks.all.length).toBe(initialTaskCount + 1);
  });

  test("Should mark a task as complete", () => {
    tasks.add({
      title: "Sample task",
      completed: false,
      dueDate: "2023-12-20",
    });

    expect(tasks.all[0].completed).toBe(false);
    tasks.markAsComplete(0);
    expect(tasks.all[0].completed).toBe(true);
  });

  test("Should retrieve overdue tasks", () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split("T")[0];
    const yesterday = formattedDate(
      new Date(dateToday.setDate(dateToday.getDate() - 1)),
    );

    const overdueTasksCount = tasks.overdue().length;
    const overdueTask = {
      title: "Finish urgent work",
      dueDate: yesterday,
      completed: false,
    };
    tasks.add(overdueTask);
    expect(tasks.overdue().length).toEqual(overdueTasksCount + 1);
  });

  test("Should retrieve tasks due today", () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split("T")[0];
    const today = formattedDate(dateToday);

    const dueTodayTasksCount = tasks.dueToday().length;
    const todayTask = {
      title: "Complete daily tasks",
      dueDate: today,
      completed: false,
    };
    tasks.add(todayTask);
    expect(tasks.dueToday().length).toEqual(dueTodayTasksCount + 1);
  });

  test("Should retrieve tasks due later", () => {
    const dateToday = new Date();
    const formattedDate = (d) => d.toISOString().split("T")[0];
    const tomorrow = formattedDate(
      new Date(dateToday.setDate(dateToday.getDate() + 1)),
    );

    const dueLaterTasksCount = tasks.dueLater().length;
    const laterTask = {
      title: "Prepare for upcoming exams",
      dueDate: tomorrow,
      completed: false,
    };
    tasks.add(laterTask);
    expect(tasks.dueLater().length).toEqual(dueLaterTasksCount + 1);
  });
});
