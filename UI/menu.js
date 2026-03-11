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
