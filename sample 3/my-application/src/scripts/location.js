const button = document.querySelector("#button");

button.addEventListener("click", () => {
    const successLocation = (position) => {
        console.log("Success");
    }

    const unsuccessLocation = () => {
        console.log("Unsuccess");
    }
    console.log("Button worked");
    navigator.geolocation.getCurrentPosition(successLocation, unsuccessLocation)

})

const electron = require("electron");
const { ipcRenderer } = electron;


console.log(ipcRenderer);