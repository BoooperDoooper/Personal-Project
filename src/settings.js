const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const path = require('path');
const ipc = ipcMain;



const loginWindow = () => {
  // Create the browser window.
  const logingWin = new BrowserWindow({
    minHeight: 750,
    minWidth: 1000,
    frame: false,
    resizable: false,
    titleBarStyle: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    }
  });
  // and load the index.html of the app or load any website
  logingWin.loadFile(path.join(__dirname, '/login/login.html'));
  logingWin.maximize();

  ipc.on('closeLog', () => {
    logingWin.close();
  });
  ipc.on('minLog', () => {
    logingWin.minimize();
  });

  
  ipc.on('userHasLog', () => {
      const mainWindow = new BrowserWindow({
        minHeight: 950,
        minWidth: 1600,
        frame: false,
        webPreferences: {
          contextIsolation: false,
          nodeIntegration: true,
        }
      });
      mainWindow.maximize();
      // and load the index.html of the app or load any website
      mainWindow.loadFile(path.join(__dirname, 'index.html'));
      // mainWindow.loadURL('https://youtube.com');
      
      // Open the DevTools.
      
      // mainWindow.webContents.openDevTools();
      
      
      ipc.on('closeApp', () => {
        mainWindow.close();
      });
      // ipc.on('resize', () => {
      //   mainWindow.setSize(1600, 950);
      // });
      ipc.on('bringDown', () => {
        mainWindow.minimize();
      });
      logingWin.close()
  });
};


app.on('ready', loginWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    loginWindow();
  }
});



// ipc.on('openProInfo', () => {
  
//   const newWindow = new BrowserWindow({
//     width: 450,
//     height: 300,
//     resizable: false
//   })
  
//   newWindow.loadFile(path.join(__dirname, '/user/profileInfo.html'));
  
//   newWindow.removeMenu();
// });