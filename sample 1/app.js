const electron = require("electron");
const url = require("url");
const path = require("path");
const { Menu } = require("electron");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({});

    console.log(process.platform)
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    )

    const navbarMenu = Menu.buildFromTemplate(navbarMenuTemplate);
    Menu.setApplicationMenu(navbarMenu)

    ipcMain.on("key", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            console.log("Merhaba")
        }
    })

})

const navbarMenuTemplate = [
    {
        label: "Dosya",
        submenu: [
            { label: "Section 1" },
            { label: "Section 2" },
            { label: "Section 3" },
        ]
    },
    { label: "Giriş" },
    {
        label: "Test",
        submenu: [
            { label: "Çıkış", accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q", role: "quit" }
        ]
    },
    {
        label: "Dev Tools",
        submenu: [
            {
                label: "Geliştirici Penceresini Aç",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }, {
                label: "Yenile",
                role: "reload"
            }
        ]
    }
]