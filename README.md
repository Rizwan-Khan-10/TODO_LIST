
---

# TODO List - Shopping List App

## Overview

This **To-Do List** project transforms into a **Shopping List** and can be used for multiple purposes. It includes three special modes: **Advanced Mode**, **Calculator Mode**, and **Budget Mode**, which add extra functionality to the basic To-Do List. Users can add tasks, mark them as completed, and organize them in various ways.

### Features:
- **Basic To-Do List**: Add tasks, mark them as complete or incomplete.
- **Advanced Mode**: Convert tasks into purchased and remaining items, with options to add quantity and price for each item.
- **Calculator Mode**: Displays a breakdown of individual item prices and the total cost.
- **Budget Mode**: Allows users to set a budget. As the prices of items are calculated, the total is updated, and if the budget exceeds, it gives a warning. The budget can also be hidden.
- **Task Management**: 
  - Tasks can be marked as complete by double-clicking.
  - Items can be deleted individually, in bulk, or all at once.
  - Cross option for deleting items by clicking on the task itself.
- **Task Persistence**: All tasks and their data are saved in **local storage**, ensuring they persist even after the page is refreshed.

### Modes:
1. **Basic Mode**: A simple to-do list with incomplete and completed tasks.
2. **Advanced Mode**: Adds columns for **quantity** and **price** for each item, and changes task labels to **purchased** and **remaining**.
3. **Calculator Mode**: Shows individual prices for each item and calculates the total cost of all items.
4. **Budget Mode**: Once activated (after Advanced and Calculator modes), users can enter their budget. The app will track the total price and notify if it exceeds the budget.

### Task Management:
- **Task States**: Tasks are shown under three categories - **All**, **Incomplete**, and **Completed**.
- **Multi-delete**: Users can select multiple tasks and delete them at once.
- **Item Deletion**: Tasks can be deleted using the cross icon or via the delete options.

### How to Use:
1. **Add a Task**: Type the task in the input box and click "Add Task".
2. **Mark a Task as Completed**: Double-click a task to move it to the **Completed** section.
3. **Switch Modes**:
   - Turn on **Advanced Mode** to add quantity and price for each task.
   - Activate **Calculator Mode** to see item-wise and total cost calculations.
   - Use **Budget Mode** to enter and track your budget for the tasks.
4. **Delete Tasks**: Delete tasks using the delete button on each task or use multi-delete and delete-all options.

### Technologies Used:
- **HTML**
- **CSS**
- **JavaScript**

### Installation:
1. Clone the repository:
   ```bash
   git clone https://github.com/Rizwan-Khan-10/TODO_LIST.git
   ```
2. Open the `index.html` file in your browser to start using the app.

### Local Storage:
All tasks are stored in **local storage**, so they persist even when the page is reloaded.

### Future Improvements:
- Add user authentication to save tasks across devices.
- Implement sorting features for tasks.
- Add more customizable features to the task list (e.g., priority, deadline).

### License:
This project is open source and available under the [MIT License](LICENSE).

---