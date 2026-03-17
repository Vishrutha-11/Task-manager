const readlineSync = require("readline-sync");
let categories = [];
function mainMenu() {
  while (true) {
    console.log("===============");
    console.log("main menu");
    console.log("===============");
    console.log("1. Add category");
    console.log("2. List category");
    console.log("3.search category");
    console.log("4.open category");
    console.log("5. Exit");
    const choice = readlineSync.question("enter a choice : ");
    switch (choice) {
      case "1":
        addCategory();
        break;
      case "2":
        listCategory();
        break;
      case "3":
        searchCategory();
        break;
      case "4":
        openCategory();
        break;
      case "5":
        console.log("good bye");
        process.exit(0);
        break;

      default:
        console.log("invalid choice");
    }
  }
}
mainMenu();
function addCategory() {
  const name = readlineSync.question("category name: ");

  if (name.toLowerCase() === "back") {
    return;
  }

  categories.push({ name: name, tasks: [] });
  console.log(`Category "${name}" created successfully`);
}

function listCategory() {
  if (categories.length === 0) {
    console.log("No categories found");
  } else {
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name}`);
    });
  }

  // const input = readlineSync.question('\nType "back" to return: ');
  // if (input.toLowerCase() === "back") return;
}

function searchCategory() {
  if (categories.length === 0) {
    console.log("No categories available");
    return;
  }

  console.log("\nAvailable Categories:");
  categories.forEach((c, index) => {
    console.log(`${index + 1}. ${c.name}`);
  });

  const search = readlineSync.question("\nEnter the term to search: ");

  if (search.toLowerCase() === "back") {
    return;
  }

  const found = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (found.length === 0) {
    console.log("No categories found matching that term.");
  } else {
    console.log("\nFound categories:");
    found.forEach((c, index) => {
      console.log(`${index + 1}. ${c.name}`);
    });
  }
}

function openCategory() {
  console.log(categories.map((c) => c.name));

  const open = readlineSync.question("pick name: ");

  if (open.toLowerCase() === "back") {
    return;
  }

  const category = categories.find((c) => c.name === open);
  if (!category) {
    console.log("invalid category");
    return;
  }

  console.log(`opened category :${category.name}`);
  categoryMenu(category);
}

function categoryMenu(category) {
  while (true) {
    console.log("\n =====Open category=====");
    console.log("1. Add Task");
    console.log("2. List Tasks");
    console.log("3. Search Task");
    console.log("4. Edit Task");
    console.log("5. Remove Task");
    console.log("6. Back");

    const choice = readlineSync.question("enter choice: ");

    switch (choice) {
      case "1":
        addTask(category);
        break;

      case "2":
        listTasks(category);
        break;

      case "3":
        searchTask(category);
        break;

      case "4":
        editTask(category);
        break;

      case "5":
        removeTask(category);
        break;

      case "6":
        return;

      default:
        console.log("Invalid choice");
    }
  }
}

function addTask(category) {
  const name = readlineSync.question("Enter task name: ");
  const description = readlineSync.question("Enter description: ");
  const priority = readlineSync.questionInt("Enter priority (1-100): ");
  const dueDate = readlineSync.question("Enter due date (YYYY-MM-DD): ");
  const tags = readlineSync.question("Enter tags (comma separated): ");

  console.log("\nSelect Status:");
  console.log("1. PENDING");
  console.log("2. PROCESSING");
  console.log("3. COMPLETED");

  let statusChoice = readlineSync.question("Enter status number: ");

  let status = "PENDING"; // default

  if (statusChoice === "2") {
    status = "PROCESSING";
  } else if (statusChoice === "3") {
    status = "COMPLETED";
  }

  const task = {
    name: name,
    description: description,
    priority: priority,
    dueDate: dueDate,
    tags: tags.split(",").map((tag) => tag.trim()),
    status: status,
  };

  category.tasks.push(task);

  console.log("Task added successfully");
}

// function listTasks(category) {
//   if (category.tasks.length === 0) {
//     console.log("No tasks found");
//     return;
//   }

//   category.tasks.forEach((task, index) => {
//     console.log(`\n${index + 1}. ${task.name}`);
//     console.log(`Description: ${task.description}`);
//     console.log(`Priority: ${task.priority}`);
//     console.log(`Due Date: ${task.dueDate}`);
//     console.log(`Tags: ${task.tags.join(", ")}`);
//     console.log(`status:${task.status}`);
//   });
// }
function listTasks(category) {
  if (category.tasks.length === 0) {
    console.log("No tasks found");
    return;
  }

  console.log("\nSort tasks by:");
  console.log("1. Name");
  console.log("2. Due Date");
  console.log("3. Created Date");
  console.log("4. Priority");
  console.log("5. None");

  const choice = readlineSync.question("Enter choice: ");

  let tasks = [...category.tasks]; // copy array

  switch (choice) {
    case "1":
      tasks.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "2":
      tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      break;

    case "3":
      tasks.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
      break;

    case "4":
      tasks.sort((a, b) => b.priority - a.priority);
      break;

    case "5":
      // no sorting
      break;

    default:
      console.log("Invalid choice. Showing unsorted tasks.");
  }

  tasks.forEach((task, index) => {
    console.log(`\n${index + 1}. ${task.name}`);
    console.log(`Description: ${task.description}`);
    console.log(`Priority: ${task.priority}`);
    console.log(`Due Date: ${task.dueDate}`);
    console.log(`Tags: ${task.tags.join(", ")}`);
    console.log(`Status: ${task.status}`);
  });
}
function searchTask(category) {
  const term = readlineSync
    .question("Enter task name to search: ")
    .toLowerCase();

  if (category.tasks.length === 0) {
    console.log("No tasks available");
    return;
  }

  let found = false;

  category.tasks.forEach((task, index) => {
    if (task.name.toLowerCase().includes(term)) {
      console.log(`\n${index + 1}. ${task.name}`);
      console.log(`Description: ${task.description}`);
      console.log(`Priority: ${task.priority}`);
      console.log(`Due Date: ${task.dueDate}`);
      console.log(`Status: ${task.status}`);
      console.log(`Tags: ${task.tags.join(", ")}`);
      found = true;
    }
  });

  if (!found) {
    console.log("Task not found");
  }
}

function editTask(category) {
  listTasks(category);

  const input = readlineSync
    .question("Enter task number or name to edit: ")
    .trim();

  let index = parseInt(input) - 1;

  if (isNaN(index)) {
    index = category.tasks.findIndex(
      (task) => task.name.toLowerCase() === input.toLowerCase(),
    );
  }

  if (index < 0 || index >= category.tasks.length) {
    console.log("Task not found");
    return;
  }

  const task = category.tasks[index];

  while (true) {
    console.log("\nEdit Menu");
    console.log("1. Name");
    console.log("2. Description");
    console.log("3. Priority");
    console.log("4. Due Date");
    console.log("5. Tags");
    console.log("6. Status");
    console.log("0. Done Editing");

    const choice = readlineSync.question("Select option: ");

    switch (choice) {
      case "1":
        task.name = readlineSync.question("Enter new name: ");
        break;

      case "2":
        task.description = readlineSync.question("Enter new description: ");
        break;

      case "3":
        task.priority = Number(
          readlineSync.question("Enter new priority (1-100): "),
        );
        break;

      case "4":
        task.dueDate = readlineSync.question("Enter new due date: ");
        break;

      case "5":
        const tags = readlineSync.question("Enter tags (comma separated): ");
        task.tags = tags.split(",").map((t) => t.trim());
        break;

      case "6":
        console.log("1. PENDING");
        console.log("2. PROCESSING");
        console.log("3. COMPLETED");

        const status = readlineSync.question("Select status: ");

        if (status === "1") task.status = "PENDING";
        if (status === "2") task.status = "PROCESSING";
        if (status === "3") task.status = "COMPLETED";
        break;

      case "0":
        console.log("Finished editing");
        return;

      default:
        console.log("Invalid choice");
    }
  }
}
function removeTask(category) {
  if (category.tasks.length === 0) {
    console.log("No tasks to remove");
    return;
  }

  listTasks(category); // show tasks first

  const name = readlineSync
    .question("\nEnter task name to delete: ")
    .trim()
    .toLowerCase();

  const index = category.tasks.findIndex(
    (task) => task.name.toLowerCase() === name,
  );

  if (index !== -1) {
    const confirm = readlineSync
      .question("Are you sure? (yes/no): ")
      .toLowerCase();

    if (confirm === "yes") {
      const removedTask = category.tasks.splice(index, 1);
      console.log(`Task "${removedTask[0].name}" removed successfully`);
    } else {
      console.log("Task deletion cancelled");
    }
  } else {
    console.log("Task not found");
  }
}
