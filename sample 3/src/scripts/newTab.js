const form = document.querySelector("#form");
const input = document.querySelector("#input");

const electron = require("electron");
const { ipcRenderer } = electron;

form.addEventListener("submit", () => {
    ipcRenderer.send("newTabButton:click", input.value)
})