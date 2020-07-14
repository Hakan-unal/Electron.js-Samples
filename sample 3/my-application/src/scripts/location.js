const button = document.querySelector("#button");
const inputBox = document.querySelector("#inputBox");
const list = document.querySelector("#list");
const clearButton = document.querySelector("#clearButton");

const electron = require("electron");
const { ipcRenderer } = electron;
let listArray;

button.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(inputBox.value)
    ipcRenderer.send("button:click", inputBox.value);
    inputBox.value = "";
})



localStorage.setItem("test", JSON.stringify(array));

console.log(JSON.parse(localStorage.getItem("test")));