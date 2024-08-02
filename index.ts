#! /usr/bin/env node
import inquirer from "inquirer";
let todolist: string[] = [];
let conditions = true;
let main = async () => {
  while (conditions) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "select an option you want to do:",
        choices: [
          "add task",
          "delete task",
          "update task",
          "viewtodo-list",
          "exit",
        ],
      },
    ]);
    if (option.choice === "add task") {
      await addtask();
    } else if (option.choice === "delete task") {
      await deletetask();
    } else if (option.choice === "update task") {
      await updatetask();
    } else if (option.choice === "viewtodo-list") {
      await viewtask();
    } else if (option.choice === "exit") {
      conditions = false;
    }
  }
};
// function to add new task in the list
let addtask = async () => {
  let newtask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: "enter your new task",
    },
  ]);
  todolist.push(newtask.task);
  console.log(`\n ${newtask.task} task added successfully in todo-list`);
};
//  function to view all todo-list task
let viewtask = async () => {
  console.log("\n your todo-list: \n");
  todolist.forEach((task, index) => {
    console.log(`${index + 1} : ${task}`);
  });
};
//  function to delete a task from the  list
let deletetask = async () => {
  await viewtask();
  let taskindex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "enter the index no  of the task you want to delete :",
    },
  ]);

  let deletedtask = todolist.splice(taskindex.index - 1, 1);
  console.log(
    `\n ${deletedtask} this task has been deleted successfully from your todo-list`
  );
};
//  function to update a task
let updatetask = async () => {
  await viewtask();
  let update_task_index = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "enter the index no  of the task you want to update:",
    },
    {
      name: "newtask",
      type: "input",
      message: "now enter new task name",
    },
  ]);
  todolist[update_task_index.index - 1] = update_task_index.newtask;
  console.log(
    `\n task at index no. ${
      update_task_index.index - 1
    } updated successfully [for updated list check option: "view todo-list"]`
  );
};
main();
