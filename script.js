// Variables to store DOM elements
const item = document.querySelector("#to-do");
const ToDoBox = document.querySelector(".list");
const All = document.getElementById("All");
const Completed = document.getElementById("Completed");
const Incomplete = document.getElementById("Incomplete");
const inputBox = document.getElementById("input-box");
const MoreOptions = document.getElementById("more-options");
const Bar = document.getElementById("bar");
const AdvanceMode = document.getElementById("Advance-feature");
const CalculatorMode = document.getElementById("Calculator");
const BudgetMode = document.getElementById("Budget");
const Delete = document.getElementById("Delete");
const DeleteOptions = document.getElementById("delete-options");
const DeleteAll = document.getElementById("delete-all");
const DeleteCompleted = document.getElementById("delete-completed");
const DeleteIncomplete = document.getElementById("delete-incomplete");
const CancelDelete = document.getElementById("cancel-delete");
const MultiSelect = document.getElementById("multi-select");
const DeleteMultiSelectOptions = document.getElementById("delete-multi-select-options");
const DeleteMultiSelect = document.getElementById("delete-multi-select");
const CancelMultiSelect = document.getElementById("cancel-multi-select");
const ListBoxHead = document.getElementById("list-box-head");
const TotalMrp = document.getElementById("mrp");
const MrpOptions = document.getElementById("mrp-options");
const ShowMrpTotal = document.getElementById("show-mrp");
const MrpMultiSelect = document.getElementById("mrp-multi-select");
const MrpCancel = document.getElementById("cancel-mrp-multi-select");
const ShowTotal = document.getElementById("show-total");
const ShowBudget = document.getElementById("show-budget");
const AddBudget = document.getElementById("add-budget");
const DisplayBudget = document.getElementById("display-budget");
const ShowDone = document.getElementById("mrp-select-options");
const Done = document.getElementById("mrp-select");
const Unselect = document.getElementById('mrp-unselect');
const Cancel = document.getElementById("cancel-mrp-select");
const HelpInfo = document.getElementById('help-info');
const CancelHelp = document.getElementById('cancel-help');
const details = document.querySelectorAll('details');
const Select = document.getElementById('Select');
const MultipleSelect = document.getElementById('multiple-select');
const AddCompleted = document.getElementById('select-completed');
const RemoveCompleted = document.getElementById("select-incomplete");
const DoneAdd = document.getElementById("add-completed");
const DoneRemove = document.getElementById("remove-completed");
let previousBudget;
let isMultiSelectEnabled = false;
let filter = "All";

const saveListToLocalStorage = () => {
    const items = [];
    document.querySelectorAll('#ToDoBox li').forEach((item) => {
        items.push({
            id: item.id,
            text: item.querySelector(".li-text").textContent.trim(),
            completed: item.dataset.completed,
            selected: item.dataset.selected,
            quantityValue: item.querySelector(".quantity .li-input").value,
            quantityUnit: item.querySelector(".quantity select").value,
            priceValue: item.querySelector(".price .li-input").value,
            priceUnit: item.querySelector(".price select").value,
            resultInput: item.querySelector(".result .li-result").innerText
        });
    });
    localStorage.setItem('todoList', JSON.stringify(items));
};

document.addEventListener("DOMContentLoaded", function () {
    const AddList = (itemText, quantityValue = "", quantityUnit = "kg", priceValue = "", priceUnit = "/kg", resultInput = "", completed = "false", selected = "false") => {
        const ListItem = document.createElement("li");
        //ListItem.classList.add("list-item-calculate");
        ListItem.innerHTML = `
            <div class="li-text">${itemText}</div>
            <div class="quantity li-div" style="display:none;">
                <input type="number" class="li-input" value="${quantityValue}">
                <select>
                    <option value="/kg" selected ${quantityUnit === "/kg" ? "selected" : ""} class="options">kg</option>
                    <option value="g" ${quantityUnit === "g" ? "selected" : ""} class="options">g</option>
                    <option value="/pc" ${quantityUnit === "/pc" ? "selected" : ""} class="options">pc</option>
                    <option value="/dz" ${quantityUnit === "/dz" ? "selected" : ""} class="options">dz</option>
                    <option value="/st" ${quantityUnit === "/st" ? "selected" : ""} class="options">st</option>
                    <option value="/L" ${quantityUnit === "/L" ? "selected" : ""} class="options">L</option>
                    <option value="ml" ${quantityUnit === "ml" ? "selected" : ""} class="options">ml</option>
                    <option value="kg" ${quantityUnit === "kg" ? "selected" : ""} class='hidden options'>kg</option>
                    <option value="/g" ${quantityUnit === "/g" ? "selected" : ""} class='hidden options'>g</option>
                    <option value="pc" ${quantityUnit === "pc" ? "selected" : ""} class='hidden options'>pc</option>
                    <option value="dz" ${quantityUnit === "dz" ? "selected" : ""} class='hidden options'>dz</option>
                    <option value="st" ${quantityUnit === "st" ? "selected" : ""} class='hidden options'>st</option>
                    <option value="L" ${quantityUnit === "L" ? "selected" : ""} class='hidden options'>L</option>
                    <option value="/ml" ${quantityUnit === "/ml" ? "selected" : ""} class='hidden options'>ml</option>
                </select>
            </div>
            <div class="price li-div" style="display:none;">
                <input type="number" class="li-input" value="${priceValue}">
                <select>
                    <option value="/kg" selected ${priceUnit === "/kg" ? "selected" : ""} class="options">/kg</option>
                    <option value="g" ${priceUnit === "g" ? "selected" : ""} class="options">g</option>
                    <option value="/pc" ${priceUnit === "/pc" ? "selected" : ""} class="options">/pc</option>
                    <option value="/dz" ${priceUnit === "/dz" ? "selected" : ""} class="options">/dz</option>
                    <option value="/st" ${priceUnit === "/st" ? "selected" : ""} class="options">/st</option>
                    <option value="/L" ${priceUnit === "/L" ? "selected" : ""} class="options">/L</option>
                    <option value="ml" ${priceUnit === "ml" ? "selected" : ""} class="options">ml</option>
                    <option value="kg" ${priceUnit === "kg" ? "selected" : ""} class="options">kg</option>
                    <option value="/g" ${priceUnit === "/g" ? "selected" : ""} class="options">/g</option>
                    <option value="pc" ${priceUnit === "pc" ? "selected" : ""} class="options">pc</option>
                    <option value="dz" ${priceUnit === "dz" ? "selected" : ""} class="options">dz</option>
                    <option value="st" ${priceUnit === "st" ? "selected" : ""} class="options">st</option>
                    <option value="L" ${priceUnit === "L" ? "selected" : ""} class="options">L</option>
                    <option value="/ml" ${priceUnit === "/ml" ? "selected" : ""} class="options">/ml</option>
                </select>
            </div>
            <div class="result li-div" style="display:none;">
                <p><i class="fa-solid fa-indian-rupee-sign"></i></p>
                <div class="li-result">${resultInput}</div>
            </div>
            <div><i class="fa-solid fa-times" style="visibility:hidden" id="cancel"></i></div>
        `;
        ListItem.dataset.selected = selected;
        ListItem.dataset.completed = completed;

        ListItem.addEventListener("dblclick", function () {
            if (!isMultiSelectEnabled) {
                if (ListItem.dataset.completed === "true") {
                    ListItem.dataset.completed = "false";
                    ListItem.classList.remove("Completed");
                } else {
                    ListItem.dataset.completed = "true";
                    ListItem.classList.add("Completed");
                }
                filterList();
                saveListToLocalStorage();
            }
        });

        ListItem.addEventListener("mouseenter", function () {
            if (!isMultiSelectEnabled) {
                ListItem.querySelector("#cancel").style.visibility = "visible";
            }
        });

        ListItem.addEventListener("mouseleave", function () {
            if (!isMultiSelectEnabled) {
                ListItem.querySelector("#cancel").style.visibility = "hidden";
            }
        });

        ListItem.querySelector("#cancel").addEventListener("dblclick", function () {
            if (!isMultiSelectEnabled) {
                ListItem.remove();
                filterList();
                saveListToLocalStorage();
            }
        });

        ToDoBox.appendChild(ListItem);
        filterList();
        addEventListenerToInputs(ListItem);
        handleModeChange();
        saveListToLocalStorage();
        DisplayHead();
        Total();
        BudgetCalculator();
        calculateResult(ListItem);
    };



    const loadListFromLocalStorage = () => {
        if (JSON.parse(localStorage.getItem('advanceMode_Calculator_mode')) === true && JSON.parse(localStorage.getItem('budgetMode')) === true) {
            OnOff(AdvanceMode);
            OnOff(CalculatorMode);
            DisplayHead();
            showBudgetUI();
            forTotal();
            if (JSON.parse(localStorage.getItem('show')) === true) {
                AddBudget.style.display = "flex";
                displayBudget();
            } else {
                AddBudget.style.display = "none";
                displayBudget();
            }
        }
        else if (JSON.parse(localStorage.getItem('advanceMode_Calculator_mode')) === true) {
            OnOff(AdvanceMode);
            OnOff(CalculatorMode);
            DisplayHead();
            forTotal();
        }
        else if (JSON.parse(localStorage.getItem('advancedmode')) === true) {
            OnOff(AdvanceMode);
            DisplayHead();
        }
        else if (JSON.parse(localStorage.getItem('calculatormode')) === true) {
            OnOff(CalculatorMode);
            DisplayHead();
            forTotal();
        }
        const items = JSON.parse(localStorage.getItem('todoList')) || [];
        items.forEach((item) => {
            AddList(item.text, item.quantityValue, item.quantityUnit, item.priceValue, item.priceUnit, item.resultInput, item.completed, item.selected);
        });
    };

    item.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            if (this.value === "") {
                return;
            } else {
                AddList(this.value);
                this.value = "";
                BudgetCalculator();
            }
        }
    });

    inputBox.querySelector("i").addEventListener("click", function () {
        if (item.value === "") {
            return;
        } else {
            AddList(item.value);
            item.value = "";
            BudgetCalculator();
        }
    });

    Bar.addEventListener("click", function (event) {
        event.stopPropagation();
        MoreOptions.classList.toggle("hidden");
        DeleteMultiSelectOptions.classList.add("hidden");
        MrpOptions.classList.add("hidden");
        ShowDone.classList.add("hidden");
        restoreIcons();
    });

    document.addEventListener("click", function (event) {
        if (!MoreOptions.contains(event.target) && event.target !== Bar) {
            MoreOptions.classList.add("hidden");
            DeleteOptions.classList.add("hidden");
            MrpOptions.classList.add("hidden");
            MultipleSelect.classList.add("hidden");
            BudgetCalculator();
            Total();
        }
    });
    loadListFromLocalStorage();
    loadBudgetFromStorage();
    AddDeco(All, [Completed, Incomplete])
});

function forTotal() {
    if (JSON.parse(localStorage.getItem('total')) === true) {
        ShowTotal.style.display = "flex";
        ShowTotal.classList.remove("fake-again");
        ShowTotal.classList.add("fake");
        Total();
    }
    else if (JSON.parse(localStorage.getItem('totalmulti')) === true) {
        ShowTotal.style.display = "flex";
        ShowTotal.classList.remove("fake");
        ShowTotal.classList.add("fake-again");
        Total();
    }
    else {
        ShowTotal.style.display = "none";
        ShowTotal.classList.remove("fake-again");
        ShowTotal.classList.remove("fake");
    }
}

// Function to filter list based on the selected filter
const filterList = () => {
    const items = ToDoBox.querySelectorAll("li");
    items.forEach(item => {
        switch (filter) {
            case "All":
                item.style.display = "flex";
                if (item.dataset.completed === "true") {
                    item.classList.add("Completed");
                }
                else {
                    item.classList.remove("Completed");
                }
                break;
            case "Completed":
                if (item.dataset.completed === "true") {
                    item.style.display = "flex";
                    item.classList.remove("Completed");
                } else {
                    item.style.display = "none";
                }
                break;
            case "Incomplete":
                if (item.dataset.completed === "true") {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                    item.classList.remove("Completed");
                }
                break;
        }
    });
};

// Event listeners for filter buttons
All.addEventListener("click", function () {
    filter = "All";
    filterList();
    AddDeco(All, [Completed, Incomplete]);
    updateTotal("All");
    DisplayHead();
});

Completed.addEventListener("click", function () {
    filter = "Completed";
    filterList();
    AddDeco(Completed, [All, Incomplete]);
    updateTotal("Purchased");
    DisplayHead();
});

Incomplete.addEventListener("click", function () {
    filter = "Incomplete";
    filterList();
    AddDeco(Incomplete, [Completed, All]);
    updateTotal("Remaining");
    DisplayHead();
});

// Function to update the total
const updateTotal = (type) => {
    const total = sumResults(type);
    if (ShowTotal.classList.contains('fake')) {
        Completed.innerHTML = 'Purchased';
        Incomplete.innerHTML = 'Remaining';
        DeleteCompleted.innerHTML = `<p>Delete Purchased Items</p>
      <i class="fa-solid fa-trash"></i>`;
        DeleteIncomplete.innerHTML = `<p>Delete Remaining Items</p>
      <i class="fa-solid fa-trash"></i>`;
        MrpOptions.style.height = '120px';
        Unselect.style.display = 'none';
        ShowTotal.innerHTML = `<p>Total of ${type} Items is <i class="fa-solid fa-indian-rupee-sign"></i>${total}</p>`;
    } else if (ShowTotal.classList.contains('fake-again')) {
        Completed.innerHTML = 'Selected';
        Incomplete.innerHTML = 'Not Selected';
        DeleteCompleted.innerHTML = `<p>Delete Selected Items</p>
      <i class="fa-solid fa-trash"></i>`;
        DeleteIncomplete.innerHTML = `<p>Delete Not Selected Items</p>
      <i class="fa-solid fa-trash"></i>`;
        MrpOptions.style.height = '160px';
        Unselect.style.display = 'flex';
        if (type === "Purchased") {
            ShowTotal.innerHTML = `<p>Total of Selected Items is <i class="fa-solid fa-indian-rupee-sign"></i>${total}</p>`;
        }
        else if (type === "Remaining") {
            ShowTotal.innerHTML = `<p>Total of Not Selected Items is <i class="fa-solid fa-indian-rupee-sign"></i>${total}</p>`;
        }
        else {
            ShowTotal.innerHTML = `<p>Total of All Items is <i class="fa-solid fa-indian-rupee-sign"></i>${total}</p>`;

        }
    }
}

// Function to add decoration to active filter button
function AddDeco(Element, OtherElements) {
    Element.classList.remove("not-deco");
    Element.classList.add("decoration");
    OtherElements.forEach(element => {
        element.classList.remove("decoration");
        element.classList.add("not-deco");
    });
}

// Event listener for toggling Advance Mode
AdvanceMode.addEventListener("click", function () {
    OnOff(AdvanceMode);
    handleModeChange();
    DisplayHead();
    if (ShowTotal.classList.contains("fake-again") && CalculatorMode.querySelector("i").classList.contains("fa-toggle-on")) {
        Completed.innerHTML = 'Selected';
        Incomplete.innerHTML = 'Not Selected';
    }
});

// Event listener for toggling Calculator Mode
CalculatorMode.addEventListener("click", function () {
    OnOff(CalculatorMode);
    handleModeChange();
    DisplayHead();
});

const showBudgetUI = () => {
    BudgetMode.querySelector("i").classList.add("fa-toggle-on");
    DisplayBudget.classList.remove('hidden');
    DisplayBudget.classList.add('more-options');
    BudgetMode.querySelector("i").classList.remove("fa-toggle-off");
    if (BudgetMode.querySelector("i").classList.contains("fa-toggle-on")) {
        DisplayHead();
        AddBudget.style.display = 'flex';
        AddBudget.innerHTML = `<p>Enter your Budget </p>
            <input type="text" id="budget-input" value="₹">`;
        ShowBudget.style.display = 'flex';
        AddBudget.addEventListener("keyup", function (events) {
            if (events.key === "Enter") {
                BudgetCalculator();
            }
        });
    }
}

const hideBudgetUI = () => {
    BudgetMode.querySelector("i").classList.add("fa-toggle-off");
    BudgetMode.querySelector("i").classList.remove("fa-toggle-on");
    AddBudget.style.display = 'none';
    DisplayBudget.innerHTML = `<p>Hide Budget</p>
      <i class="fa-solid fa-indian-rupee-sign"></i>`;
    DisplayBudget.classList.add('hidden');
    DisplayBudget.classList.remove('more-options');
    ShowBudget.style.display = 'none';
    localStorage.setItem('budgetMode', false);
    DisplayHead();
}

BudgetMode.addEventListener('click', function () {
    if (BudgetMode.querySelector("i").classList.contains("fa-toggle-off")) {
        showBudgetUI();
        localStorage.setItem('budgetMode', true);
    } else {

        hideBudgetUI();
    }
});

DisplayBudget.addEventListener('click', function () {
    displayBudget();
    BudgetCalculator();
    MoreOptions.classList.add('hidden');
});

function displayBudget() {
    if (AddBudget.style.display === 'flex') {
        AddBudget.style.display = 'none';
        DisplayBudget.innerHTML = `<p>Show Budget</p>
          <i class="fa-solid fa-indian-rupee-sign"></i>`;
        ShowBudget.style.display = 'flex';
        BudgetCalculator();
        localStorage.setItem('show', true);
    } else {
        AddBudget.style.display = 'flex';
        BudgetCalculator();
        DisplayBudget.innerHTML = `<p>Hide Budget</p>
          <i class="fa-solid fa-indian-rupee-sign"></i>`;
        localStorage.setItem('show', false);
    }
}

function BudgetCalculator() {
    let inputBudgetValue = document.getElementById('budget-input').value;
    inputBudgetValue = inputBudgetValue.replace(/₹/g, '');
    const BudgetInput = (parseFloat(inputBudgetValue) || previousBudget) || 0;
    if (inputBudgetValue.length > 0) {
        localStorage.setItem('budgetValue', BudgetInput); // Save budget to local storage
    }
    const total = sumResults("All");
    const BudgetResult = BudgetInput - total;

    if (BudgetResult < 0) {
        ShowBudget.innerHTML = `<p>You have exceeded your budget by <i class="fa-solid fa-indian-rupee-sign"></i> ${Math.abs(BudgetResult)}</p>`;
    } else {
        ShowBudget.innerHTML = `<p>You can spend <i class="fa-solid fa-indian-rupee-sign"></i> ${BudgetResult}</p>`;
    }
}

// Function to retrieve and display the saved budget value on page load
function loadBudgetFromStorage() {
    const savedBudget = localStorage.getItem('budgetValue');
    if (savedBudget !== null) {
        document.getElementById('budget-input').value = `₹${savedBudget}`;
        BudgetCalculator();
    }
    previousBudget = savedBudget;
}

// Function to toggle mode on/off
function OnOff(Element) {
    if (Element.querySelector("i").classList.contains("fa-toggle-off")) {
        Element.querySelector("i").classList.remove("fa-toggle-off");
        Element.querySelector("i").classList.add("fa-toggle-on");
        Completed.innerHTML = "Purchased";
        Incomplete.innerHTML = "Remaining";
        Delete.innerHTML = `<p>Delete Items</p>
        <i class="fa-solid fa-ellipsis-vertical"></i>`;
        DeleteAll.innerHTML = `<p>Delete All Items</p>
      <i class="fa-solid fa-trash"></i>`;
        DeleteCompleted.innerHTML = `<p>Delete Purchased Items</p>
      <i class="fa-solid fa-trash"></i>`;
        DeleteIncomplete.innerHTML = `<p>Delete Remaining Items</p>
      <i class="fa-solid fa-trash"></i>`;
        DeleteMultiSelect.innerHTML = `<p>Delete Multi-Select Items</p>
      <i class="fa-solid fa-trash"></i>`;
        AddCompleted.innerHTML = `<p>Add Items</p>
      <i class="fa-solid fa-check-double"></i>`;
        RemoveCompleted.innerHTML = `<p>Remove Items</p>
      <i class="fa-solid fa-check-double"></i>`;
    }
    else {
        Element.querySelector("i").classList.remove("fa-toggle-on");
        Element.querySelector("i").classList.add("fa-toggle-off");
        TotalMrp.classList.add("hidden");
        TotalMrp.classList.remove("more-options");
        DisplayBudget.classList.add('hidden');
        DisplayBudget.classList.remove('more-options');
        MrpOptions.classList.add("hidden");
        ShowDone.classList.add("hidden");
        ShowTotal.style.display = "none";
        AddBudget.style.display = 'none';
        BudgetMode.querySelector("i").classList.add("fa-toggle-off");
        BudgetMode.querySelector("i").classList.remove("fa-toggle-on");
        ShowBudget.style.display = 'none';
        Delete.innerHTML = `<p>Delete Tasks</p>
        <i class="fa-solid fa-ellipsis-vertical"></i>`;
        DeleteAll.innerHTML = `<p>Delete All Tasks</p>
      <i class="fa-solid fa-trash"></i>`;
        DeleteCompleted.innerHTML = `<p>Delete Completed Tasks</p>
      <i class="fa-solid fa-trash"></i>`;
        DeleteIncomplete.innerHTML = `<p>Delete Incomplete Tasks</p>
      <i class="fa-solid fa-trash"></i>`;
        DeleteMultiSelect.innerHTML = `<p>Delete Multi-Select Tasks</p>
      <i class="fa-solid fa-trash"></i>`;
        AddCompleted.innerHTML = `<p>Add Task</p>
      <i class="fa-solid fa-check-double"></i>`;
        RemoveCompleted.innerHTML = `<p>Remove Task</p>
      <i class="fa-solid fa-check-double"></i>`;
    }
}

//function to display list head
function DisplayHead() {
    if (AdvanceMode.querySelector("i").classList.contains("fa-toggle-on") &&
        CalculatorMode.querySelector("i").classList.contains("fa-toggle-on")) {
        ListBoxHead.style.display = "flex";
        ListBoxHead.querySelector("#li-price").classList.remove("li-advance-mode");
        ListBoxHead.querySelector("#li-result").classList.remove("li-calculator-mode");
        ListBoxHead.querySelector("#li-price").classList.add("li-head-price");
        ListBoxHead.querySelector("#li-result").classList.remove("li-head-result");
        ListBoxHead.querySelector("#li-quantity").classList.remove("li-head-result");
        ListBoxHead.querySelector("#li-price").classList.remove("li-head-result");
        ListBoxHead.querySelector("#li-result").classList.add("head-result");
        MoreOptions.style.height = "280px";
        BudgetMode.classList.remove('hidden');
        BudgetMode.classList.add('more-options');
        TotalMrp.classList.remove("hidden");
        TotalMrp.classList.add("more-options");
        localStorage.setItem('advanceMode_Calculator_mode', true);
        localStorage.setItem('calculatormode', false);
        localStorage.setItem('advancedmode', false);
        ToDoBox.style.justifyContent = "space-evenly";
        const items = ToDoBox.querySelectorAll("li");
        items.forEach(item => {
            const text = item.querySelector(".li-text");
            if (text) {
                text.style.width = "50px";
            }
        });
        if (BudgetMode.querySelector("i").classList.contains("fa-toggle-on")) {
            MoreOptions.style.height = "320px";
        }
    }
    else if (AdvanceMode.querySelector("i").classList.contains("fa-toggle-on")) {
        ListBoxHead.style.display = "flex";
        ListBoxHead.querySelector("#li-price").classList.add("li-advance-mode");
        ListBoxHead.querySelector("#li-result").classList.add("li-head-result");
        ListBoxHead.querySelector("#li-quantity").classList.remove("li-head-result");
        ListBoxHead.querySelector("#li-price").classList.remove("li-head-result");
        ListBoxHead.querySelector("#li-price").classList.remove("li-head-price");
        ListBoxHead.querySelector("#li-result").classList.remove("li-calculator-mode");
        ListBoxHead.querySelector("#li-result").classList.remove("head-result");
        MoreOptions.style.height = "200px";
        TotalMrp.classList.remove("more-options");
        TotalMrp.classList.add("hidden");
        BudgetMode.classList.remove('more-options');
        BudgetMode.classList.add('hidden');
        localStorage.setItem('advanceMode_Calculator_mode', false);
        localStorage.setItem('calculatormode', false);
        localStorage.setItem('advancedmode', true);
        const items = ToDoBox.querySelectorAll("li");
        items.forEach(item => {
            const text = item.querySelector(".li-text");
            if (text) {
                text.style.width = "100px";
            }
        });
        if (CalculatorMode.querySelector("i").classList.contains("fa-toggle-off")) {
            MrpOptions.style.height = '120px';
            Unselect.style.display = 'none';
            ShowTotal.classList.remove("fake");
            ShowTotal.classList.remove("fake-again");
            Completed.innerHTML = "Purchased";
            Incomplete.innerHTML = "Remaining";
            localStorage.setItem('total', false);
            localStorage.setItem('totalmulti', false);
        }
    }
    else if (CalculatorMode.querySelector("i").classList.contains("fa-toggle-on")) {
        ListBoxHead.style.display = "flex";
        ListBoxHead.querySelector("#li-price").classList.add("li-head-result");
        ListBoxHead.querySelector("#li-result").classList.remove("li-head-result");
        ListBoxHead.querySelector("#li-price").classList.remove("li-head-price");
        ListBoxHead.querySelector("#li-price").classList.remove("li-advance-mode");
        ListBoxHead.querySelector("#li-quantity").classList.add("li-head-result");
        ListBoxHead.querySelector("#li-result").classList.add("li-calculator-mode");
        ListBoxHead.querySelector("#li-result").classList.remove("head-result");
        MoreOptions.style.height = "240px";
        TotalMrp.classList.remove("hidden");
        TotalMrp.classList.add("more-options");
        BudgetMode.classList.remove('more-options');
        BudgetMode.classList.add('hidden');
        localStorage.setItem('advanceMode_Calculator_mode', false);
        localStorage.setItem('calculatormode', true);
        localStorage.setItem('advancedmode', false);
        const items = ToDoBox.querySelectorAll("li");
        items.forEach(item => {
            const text = item.querySelector(".li-text");
            if (text) {
                text.style.width = "200px";
            }
        });
    }
    else {
        MoreOptions.style.height = "200px";
        localStorage.setItem('advanceMode_Calculator_mode', false);
        localStorage.setItem('calculatormode', false);
        localStorage.setItem('advancedmode', false);
        localStorage.setItem('total', false);
        localStorage.setItem('totalmulti', false);
        ListBoxHead.style.display = "none";
        Completed.innerHTML = "Completed";
        Incomplete.innerHTML = "Incomplete";
        const items = ToDoBox.querySelectorAll("li");
        items.forEach(item => {
            const text = item.querySelector(".li-text");
            if (text) {
                text.style.width = "350px";
            }
        });
    }
}

// Event listener for toggling Delete Options dropdown
Delete.addEventListener("click", function () {
    MoreOptions.classList.add("hidden");
    DeleteOptions.classList.toggle("hidden");
});

// Event listener to delete all items
DeleteAll.addEventListener("click", function () {
    ToDoBox.innerHTML = "";
    DeleteOptions.classList.add("hidden");
    ShowTotal.style.display = 'none';
    ShowTotal.classList.remove("fake-again");
    localStorage.removeItem('todoList');
    CorrectDelete();
    deleteCompletedItems();
    deleteIncompleteItems();
    BudgetCalculator();
    Total();
});

// Event listener to delete completed items
DeleteCompleted.addEventListener("click", function () {
    const items = ToDoBox.querySelectorAll("li[data-completed='true']");
    items.forEach(item => item.remove());
    DeleteOptions.classList.add("hidden");
    ShowTotal.style.display = 'none';
    ShowTotal.classList.remove("fake-again");
    deleteCompletedItems();
    filterList();
    BudgetCalculator();
    Total();
});

// Function to delete completed items from the list and local storage
const deleteCompletedItems = () => {
    const items = JSON.parse(localStorage.getItem('todoList')) || [];
    const filteredItems = items.filter(item => item.completed !== "true");
    localStorage.setItem('todoList', JSON.stringify(filteredItems));
    document.querySelectorAll('#ToDoBox li').forEach((item) => {
        if (item.dataset.completed === "true") {
            item.remove();
        }
    });
};

// Event listener to delete incomplete items
DeleteIncomplete.addEventListener("click", function () {
    const items = ToDoBox.querySelectorAll("li[data-completed='false']");
    items.forEach(item => item.remove());
    DeleteOptions.classList.add("hidden");
    ShowTotal.style.display = 'none';
    ShowTotal.classList.remove("fake-again");
    deleteIncompleteItems();
    filterList();
    BudgetCalculator();
    Total();
});

// Function to delete incomplete items from the list and local storage
const deleteIncompleteItems = () => {
    const items = JSON.parse(localStorage.getItem('todoList')) || [];
    const filteredItems = items.filter(item => item.completed === "true");
    localStorage.setItem('todoList', JSON.stringify(filteredItems));
    document.querySelectorAll('#ToDoBox li').forEach((item) => {
        if (item.dataset.completed === "false") {
            item.remove();
        }
    });
};

function CorrectDelete() {
    Unselect.style.display = 'none';
    MrpOptions.style.height = '120px';
    DisplayHead();
}

CancelDelete.addEventListener("click", function () {
    DeleteOptions.classList.add("hidden");
})

Select.addEventListener('click', function () {
    MultipleSelect.classList.remove('hidden');
    MoreOptions.classList.add('hidden');
})

document.getElementById("cancel-multiple-select").addEventListener("click", function () {
    MultipleSelect.classList.add("hidden");
})

AddCompleted.addEventListener("click", function () {
    MultipleSelect.classList.add("hidden");
    DoneAdd.classList.remove("hidden");
    isMultiSelectEnabled = !isMultiSelectEnabled;
    toggleMultiSelectMode(isMultiSelectEnabled);
    AddDeco(Incomplete, [All, Completed]);
    filter = "Incomplete";
    filterList();
})

DoneAdd.addEventListener("click", function () {
    const selectedItems = ToDoBox.querySelectorAll("li.selected");
    selectedItems.forEach(item => {
        AddDeco(Completed, [All, Incomplete]);
        item.dataset.completed = "true";
        filter = "Completed";
        filterList();
    });
    saveListToLocalStorage();
    DoneAdd.classList.add("hidden");
    isMultiSelectEnabled = false;
    toggleMultiSelectMode(false);
    restoreIcons();
    BudgetCalculator();
    Total();
})

document.getElementById("cancel-add-completed").addEventListener("click", function () {
    DoneAdd.classList.add("hidden");
    removemulti();
})

const removemulti = () => {
    isMultiSelectEnabled = false;
    toggleMultiSelectMode(false);
    restoreIcons();
}

RemoveCompleted.addEventListener("click", function () {
    MultipleSelect.classList.add("hidden");
    DoneRemove.classList.remove("hidden");
    isMultiSelectEnabled = !isMultiSelectEnabled;
    toggleMultiSelectMode(isMultiSelectEnabled);
    AddDeco(Completed, [Incomplete, All]);
    filter = "Completed";
    filterList();
})

DoneRemove.addEventListener("click", function () {
    const selectedItems = ToDoBox.querySelectorAll("li.selected");
    selectedItems.forEach(item => {
        AddDeco(Incomplete, [Completed, All]);
        item.dataset.completed = "false";
        filter = "Incomplete";
        filterList();
    });
    saveListToLocalStorage();
    DoneRemove.classList.add("hidden");
    isMultiSelectEnabled = false;
    toggleMultiSelectMode(false);
    restoreIcons();
    BudgetCalculator();
    Total();
})

document.getElementById("cancel-remove-completed").addEventListener("click", function () {
    DoneRemove.classList.add("hidden");
    removemulti();
})

// Event listener to toggle multi-select mode
MultiSelect.addEventListener("click", function () {
    isMultiSelectEnabled = !isMultiSelectEnabled;
    toggleMultiSelectMode(isMultiSelectEnabled);
    MoreOptions.classList.add("hidden");
    DeleteMultiSelectOptions.classList.remove("hidden");
});

// Function to toggle multi-select mode styles and functionality
const toggleMultiSelectMode = (enabled) => {
    const items = ToDoBox.querySelectorAll("li");
    items.forEach(item => {
        const cancelIcon = item.querySelector("#cancel");
        if (enabled) {
            cancelIcon.classList.remove("fa-times");
            cancelIcon.classList.remove("fa-solid");
            cancelIcon.classList.add("fa-square-check");
            cancelIcon.classList.add("fa-regular");
            cancelIcon.style.visibility = "visible";
            cancelIcon.addEventListener("click", toggleSelection);
        } else {
            cancelIcon.classList.remove("fa-square-check");
            cancelIcon.classList.remove("fa-regular");
            cancelIcon.classList.add("fa-times");
            cancelIcon.classList.add("fa-solid");
            cancelIcon.style.visibility = "hidden";
            cancelIcon.removeEventListener("click", toggleSelection);
        }
    });
};

// Function to handle toggling of item selection in multi-select mode
const toggleSelection = (event) => {
    event.target.classList.toggle("fa-regular");
    event.target.classList.toggle("fa-solid");
    event.target.parentElement.parentElement.classList.toggle("selected");
};

// Event listener to delete selected items in multi-select mode
DeleteMultiSelect.addEventListener("click", function () {
    if (isMultiSelectEnabled) {
        const selectedItems = ToDoBox.querySelectorAll("li.selected");
        selectedItems.forEach(item => {
            item.dataset.selected = "true";
            item.remove();
        });
        saveListToLocalStorage();
        DeleteMultiSelectOptions.classList.add("hidden");
        isMultiSelectEnabled = false;
        toggleMultiSelectMode(false);
        restoreIcons();
        deleteSelectedItems();
        BudgetCalculator();
        Total();
    }
});

// Function to delete selected items from the list and local storage
const deleteSelectedItems = () => {
    const items = JSON.parse(localStorage.getItem('todoList')) || [];
    const filteredItems = items.filter(item => item.selected !== "true");
    localStorage.setItem('todoList', JSON.stringify(filteredItems));
    document.querySelectorAll('#ToDoBox li').forEach((item) => {
        if (item.dataset.selected === "true") {
            item.remove();
        }
    });
};

// Event listener to cancel multi-select mode
CancelMultiSelect.addEventListener("click", function () {
    if (isMultiSelectEnabled) {
        DeleteMultiSelectOptions.classList.add("hidden");
        isMultiSelectEnabled = false;
        toggleMultiSelectMode(false);
        restoreIcons();
    }
});

// Function to restore icons and clear selection in multi-select mode
const restoreIcons = () => {
    const items = ToDoBox.querySelectorAll("li");
    items.forEach(item => {
        const cancelIcon = item.querySelector("#cancel");
        cancelIcon.classList.remove("fa-square-check");
        cancelIcon.classList.add("fa-times");
        cancelIcon.classList.remove("fa-regular");
        cancelIcon.classList.add("fa-solid");
        cancelIcon.style.visibility = "hidden";
        item.classList.remove("selected");
    });
};

// Function to add event listeners to quantity and price inputs
const addEventListenerToInputs = (ListItem) => {
    const input1 = ListItem.querySelector('.quantity input');
    const input2 = ListItem.querySelector('.price input');

    input1.addEventListener('input', () => calculateResult(ListItem));
    input2.addEventListener('input', () => calculateResult(ListItem));

    // Event listener to synchronize unit selection between quantity and price divs
    const select1 = ListItem.querySelector('.quantity select');
    const select2 = ListItem.querySelector('.price select');

    select1.addEventListener('change', () => {
        select2.value = select1.value;
    });

    select2.addEventListener('change', () => {
        select1.value = select2.value;
    });

    select1.addEventListener('input', () => calculateResult(ListItem));
    select2.addEventListener('input', () => calculateResult(ListItem));
};

// Function to calculate and display result based on quantity and price inputs
const calculateResult = (ListItem) => {
    const quantityInput = parseFloat(ListItem.querySelector('.quantity input').value) || 0;
    const quantityUnit = ListItem.querySelector('.quantity select').value;
    const priceInput = parseFloat(ListItem.querySelector('.price input').value) || 0;
    const priceUnit = ListItem.querySelector('.price select').value;
    const resultInput = ListItem.querySelector('.result div');

    if ((quantityUnit && priceUnit == "/kg") || (quantityUnit && priceUnit == "/L")) {
        resultInput.innerHTML = quantityInput * priceInput;
    }
    else if ((quantityUnit && priceUnit == "/st") || (quantityUnit && priceUnit == "/pc")) {
        resultInput.innerHTML = quantityInput * priceInput;
    }
    else if (priceUnit == "/g" || priceUnit == "/ml") {
        resultInput.innerHTML = quantityInput * priceInput;
    }
    else if (priceUnit == "kg" || priceUnit == "L") {
        resultInput.innerHTML = priceInput;
    }
    else if (priceUnit == "pc" || priceUnit == "st") {
        resultInput.innerHTML = priceInput;
    }
    else if ((quantityUnit && priceUnit == "g") || (quantityUnit && priceUnit == "ml")) {
        resultInput.innerHTML = priceInput;
    }
    else if ((quantityUnit && priceUnit == "/dz")) {
        resultInput.innerHTML = quantityInput * priceInput;
    }
    else if ((quantityUnit && priceUnit == "dz")) {
        resultInput.innerHTML = priceInput;
    }
    else {
        resultInput.innerHTML = 0;
    }
    loadBudgetFromStorage();
    BudgetCalculator();
    Total();
    saveListToLocalStorage();
};

// Function to handle visibility of quantity, price, and result divs based on mode toggles
const handleModeChange = () => {
    const items = ToDoBox.querySelectorAll("li");

    items.forEach(item => {
        const Quantity = item.querySelector('.quantity');
        const Price = item.querySelector('.price');
        const Result = item.querySelector('.result');

        if (AdvanceMode.querySelector("i").classList.contains("fa-toggle-on") &&
            CalculatorMode.querySelector("i").classList.contains("fa-toggle-on")) {
            Quantity.style.display = "block";
            Price.style.display = "block";
            Result.style.display = "flex";

        } else if (AdvanceMode.querySelector("i").classList.contains("fa-toggle-on")) {
            Quantity.style.display = "block";
            Price.style.display = "block";
            Result.style.display = "none";
        } else if (CalculatorMode.querySelector("i").classList.contains("fa-toggle-on")) {
            Quantity.style.display = "none";
            Price.style.display = "none";
            Result.style.display = "flex";
        } else {
            Quantity.style.display = "none";
            Price.style.display = "none";
            Result.style.display = "none";
        }
    });
};

TotalMrp.addEventListener("click", function () {
    MoreOptions.classList.add("hidden");
    MrpOptions.classList.remove("hidden");
})

// Function to sum the results based on filter
const sumResults = (filter) => {
    let total = 0;
    const items = ToDoBox.querySelectorAll("li");

    items.forEach(item => {
        const itemTotal = parseFloat(item.querySelector(".li-result").innerText) || 0;

        if (filter === "All" ||
            (filter === "Purchased" && item.dataset.completed === "true") ||
            (filter === "Remaining" && item.dataset.completed === "false")) {
            total += itemTotal;
        }
    });
    return total;
};

function Total() {
    if (All.classList.contains('decoration')) {
        updateTotal("All");
    }
    else if (Completed.classList.contains('decoration')) {
        updateTotal("Purchased");
    }
    else if (Incomplete.classList.contains('decoration')) {
        updateTotal("Remaining");
    }
}

// Event listener for calculating total of respected section
ShowMrpTotal.addEventListener("click", function () {
    ShowTotal.style.display = "flex";
    ShowTotal.classList.add('fake');
    ShowTotal.classList.remove('fake-again');
    MrpOptions.classList.add("hidden");
    localStorage.setItem('totalmulti', false);
    localStorage.setItem('total', true);
    Total();
});

// Event listener to enable multi-select for total calculation
MrpMultiSelect.addEventListener("click", function () {
    isMultiSelectEnabled = true;
    toggleMultiSelectMode(true);
    ShowTotal.classList.remove('fake');
    MrpOptions.classList.add("hidden");
    ShowDone.classList.remove("hidden");
});

// Event listener to calculate total of selected items in multi-select mode
Done.addEventListener("click", function () {
    ShowTotal.style.display = "flex";
    ShowDone.classList.add("hidden");
    ShowTotal.classList.remove("fake");
    ShowTotal.classList.add('fake-again');
    const selectedItems = ToDoBox.querySelectorAll("li.selected");
    selectedItems.forEach(item => {
        item.dataset.completed = "true";
        item.classList.add("Completed");
        filter = "Completed";
        filterList();
    })
    isMultiSelectEnabled = false;
    toggleMultiSelectMode(false);
    restoreIcons();
    AddDeco(Completed, [All, Incomplete]);
    localStorage.setItem('total', false);
    localStorage.setItem('totalmulti', true);

    Total();
});

// Event listener to unselect selected items
Unselect.addEventListener('click', function () {
    MrpOptions.classList.add("hidden");
    Unselect.style.display = 'none';
    MrpOptions.style.height = '120px';
    ShowTotal.style.display = 'none';
    ShowTotal.classList.remove('fake-again');
    ShowTotal.classList.add("fake");
    localStorage.setItem('totalmulti', false);
    localStorage.setItem('total', false);
    Total();
    const selectedItems = ToDoBox.querySelectorAll("li[data-completed='true']");
    selectedItems.forEach(item => {
        item.dataset.completed = "false";
        AddDeco(All, [Completed, Incomplete]);
        filter = "All";
        filterList();
    })
});

// Event listener to cancel multi-select mode for total calculation
Cancel.addEventListener("click", function () {
    ShowDone.classList.add("hidden");
    isMultiSelectEnabled = false;
    toggleMultiSelectMode(false);
    restoreIcons();
});

// Event listener to cancel MRP multi-select options
MrpCancel.addEventListener("click", function () {
    MrpOptions.classList.add("hidden");
});

Help.addEventListener('click', function () {
    HelpInfo.classList.remove("hidden");
    Bar.style.display = 'none';
    Bar.parentElement.querySelector('span').style.display = 'none';
    MoreOptions.classList.add('hidden');
})

CancelHelp.addEventListener('click', function () {
    HelpInfo.classList.add('hidden');
    Bar.parentElement.querySelector('span').style.display = 'block';
    Bar.style.display = 'block';
})

// Initial call to handle the mode state on page load
handleModeChange();

// Add event listener to each details element
details.forEach((targetDetail) => {
    targetDetail.addEventListener('click', () => {
        details.forEach((detail) => {
            if (detail !== targetDetail) {
                detail.removeAttribute('open');
            }
        });
    });
});
