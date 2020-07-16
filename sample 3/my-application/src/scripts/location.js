const button = document.querySelector("#button");
const inputBox = document.querySelector("#inputBox");
const list = document.querySelector("#list");
const clearButton = document.querySelector("#clearButton");
const openNewTabButton = document.querySelector("#openNewTabButton");


const electron = require("electron");
const { ipcRenderer } = electron;
let listArray = [];

const itemAddToList = (item) => {
    listArray.push(item);
    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item list-group-item-action");
    li.innerHTML = `<b>${listArray.length}.</b> ${item}`;
    list.appendChild(li);
}

const clearList = () => {
    list.innerHTML = "";
    listArray = [];
}


button.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(inputBox.value)
    ipcRenderer.send("button:click", inputBox.value);
    itemAddToList(inputBox.value);
    inputBox.value = "";
})

openNewTabButton.addEventListener("click", () => {
    ipcRenderer.send("openNewTab:click", inputBox.value);
    console.log(inputBox.value)

})

clearButton.addEventListener("click", clearList);