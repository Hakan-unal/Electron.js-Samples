const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

// Uygulama dinleniyor
app.on("ready", function () {

    // Yeni pencere oluşturuluyor
    mainWindow = new BrowserWindow({
        title: "Main Page"
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "mainWindow.html"),
        protocol: "file:",
        slashes: true
    }))

    // Ana ekran kapatıldığında uygulamanın kapatılması için
    mainWindow.on("closed", function () {
        app.quit();
    });




    // Template üzerinden menu uygulamaya burada import ediliyor
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
})


// createAddWindow fonksiyonu tanımlandı

const createAddWindow = () => {

    // Add window sayfasının özellikleri burada oluşturuldu
    addWindow = new BrowserWindow({
        width: 350,
        height: 250,
        title: "Add Window"
    });

    // Add window sayfası burada çağırıldı
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, "addWindow.html"),
        protocol: "file:",
        slashes: true
    }))

    addWindow.on("close", function () {
        addWindow = null;
    })

}















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


if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push({
        label: "Developer Tools",
        submenu: [
            {
                label: "Toggle DEvTools",
                accelerator: process.platform == "darwin" ? "Command+I" :
                    "Ctrl+I",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }, {
                role: "reload"
            }
        ]
    })
}



// Catch item:add
ipcMain.on('item:add', function (e, item) {
    mainWindow.webContents.send('item:add', item);
    console.log(item);
    alert(item)
    addWindow.close();
    // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
    //addWindow = null;
});