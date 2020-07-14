const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow } = electron;

let mainWindow;

// Uygulama dinleniyor
app.on("ready", () => {

    // Yeni pencere oluşturuluyor
    mainWindow = new BrowserWindow({});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "mainWİndow.html"),
        protocol: "file:",
        slashes: true
    }))
})


// Menu templatei  burada oluşturuluyor