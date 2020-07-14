const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

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

    // Template üzerinden menu uygulamaya burada import ediliyor
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
})


// createAddWindow fonksiyonu tanımlandı












// Menu template'i  burada oluşturuluyor

const mainMenuTemplate = [
    { label: "File" },
    {
        label: "Setting",
        submenu: [
            { label: "Giriş" },
            { label: "Test" },
            {
                label: "Element ekle",
                click() {
                    createAddWindow();
                }
            },
            {
                label: "Çıkış",
                accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                click() { app.quit() }
            }
        ]
    },

]