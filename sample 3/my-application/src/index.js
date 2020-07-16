const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const url = require("url");
const { on } = require('process');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 650,
    height: 450,
    webPreferences: {
      nodeIntegration: true
    }


  });


  // and load the index.html of the app. 
  // Aşağıdaki ile aynı yöntem

  mainWindow.loadFile(path.join(__dirname, 'index.html'));


  // Yukarıdaki ile aynı yöntem
  /*
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
    slashes: true
  }))
  */


  // Template üzerinden menu uygulamaya burada import ediliyor
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("close", () => {
    app.quit();
  })

};


const openNewWindow = (item) => {
  addWindow = new BrowserWindow({
    width: 480,
    height: 250,
    title: item
  });
  addWindow.loadFile(path.join(__dirname, 'newTab.html'));

  addWindow.on("close", () => {
    addWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.



// Menu template'i  burada oluşturuluyor

const mainMenuTemplate = [
  { label: "File" },
  {
    label: "Developer Tools",
    submenu: [
      {
        label: "Dev Tools",
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  },
  {
    label: "Settings",
    submenu: [
      { label: "Giriş" },
      { label: "Test" },
      {
        label: "Çıkış",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() { app.quit() }
      }
    ]
  }

]


// Event Tetiklenmeleri aşağıda yakalanıyor

ipcMain.on("button:click", (err, item) => {
  console.log("button:click event'i tetiklendi")
})

ipcMain.on("openNewTab:click", (err, item) => {
  openNewWindow(item);
})
