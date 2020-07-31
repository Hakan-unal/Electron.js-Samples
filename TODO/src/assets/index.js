const row = document.querySelector("#row");
const workName = document.querySelector("#workName");
const textArea = document.querySelector("#textArea");
const startDate = document.querySelector("#startDate");
const finishDate = document.querySelector("#finishDate");
const button = document.querySelector("#button");





class ToDoList {
    constructor(workName, textArea, startDate, finishDate) {
        this.workName = workName;
        this.textArea = textArea;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.id = `button${Math.round(Math.random() * 100000)}`;
    }

    saveElement() {
        let list = JSON.parse(localStorage.getItem("toDoList"));
        if (list === null) {
            list = [];
            list.push(this);
        } else {
            list.push(this);
        }
        localStorage.setItem("toDoList", JSON.stringify(list));
    }

    static deleteElement(id) {
        const list = JSON.parse(localStorage.getItem("toDoList"));
        list.forEach(element => {
            if (element.id === id) {
                let index = list.indexOf(element);
                list.splice(index, 1);
            }
        });
        localStorage.setItem("toDoList", JSON.stringify(list));
    }

    static displayList() {
        const list = JSON.parse(localStorage.getItem("toDoList"));
        const length = list.length;
        if (length !== null) {
            list.forEach(element => {
                const div = document.createElement("div");
                div.setAttribute("class", "card col-sm-6 col-md-4 col-lg-3");
                div.innerHTML = `
                    <div class="card-body">
                            <div class="card-title text-uppercase">Name:${element.workName}</div>
                            <hr>
                            <div class="card-text">Description: ${element.textArea}</div>
                            <ul class="list-group mt-3">
                                <li class="list-group-item">Start Date:${element.startDate}</li>
                                <li class="list-group-item">Due Date:${element.finishDate}</li>
                            </ul>
                            <div class="card-footer">
                                <a id="${element.id}" type="button" class="btn btn-outline-dark btn-lg btn-block" name="delete">Delete</a>
                            </div>
                    </div>
                `;
                row.appendChild(div);
            })
        }

        else {
            console.log("Localstorage not has element");
        }

    }
}



button.addEventListener("click", () => {
    if (workName.value !== "" & textArea.value !== "" & startDate.value !== "" & finishDate.value !== "") {
        const object = new ToDoList(workName.value, textArea.value, startDate.value, finishDate.value);
        object.saveElement();
    } else {
        alert("Please fill in all the blanks");
    }
    workName.value = "";
    textArea.value = "";
    startDate.value = "";
    finishDate.value = "";
    row.innerHTML = "";
    ToDoList.displayList();
});

row.addEventListener("click", (event) => {
    if (event.target.name === "delete") {
        ToDoList.deleteElement(event.target.id);
        row.innerHTML = "";
        ToDoList.displayList();
    }
})

ToDoList.displayList();