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

  categories.push(name);
  console.log(`Category "${name}" created successfully`);
}

function listCategory() {
  const input = readlineSync.question('\nType "back" to return: ');
  if (input.toLowerCase() === "back") return;

  if (categories.length === 0) {
    console.log("No categories found");
  } else {
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat}`);
    });
  }
}

function searchCategory() {
  console.log(categories);

  const search = readlineSync.question("enter the term to search: ");

  if (search.toLowerCase() === "back") {
    return;
  }

  if (categories.includes(search)) {
    console.log(`${search} is found`);
  } else {
    console.log("No categories found matching that term.");
  }
}

function openCategory() {
  console.log(categories);

  const open = readlineSync.question("pick name: ");

  if (open.toLowerCase() === "back") {
    return;
  }

  if (categories.includes(open)) {
    console.log("category is opened");
  } else {
    console.log("invalid category name");
  }
}
