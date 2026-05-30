const taskInput = document.getElementById("taskInput")
const AddBtn = document.getElementById("AddBtn")
const taskList = document.getElementById("taskList")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderTasks() {
    taskList.innerHTML = ""
    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.classList.add("task-text");

        if (task.completed) {
            span.classList.add("completed");
        }
        span.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

}

AddBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim()
    if (taskText === "") {
        alert('please Enter your task')
        return
    }
    tasks.push({ text: taskText, completed: false })

    saveTasks()
    renderTasks()
    taskInput.value = "";
})

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        AddBtn.click()
    }
})
renderTasks()