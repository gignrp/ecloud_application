const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'src/SealCircle.ico') // Set the icon path
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const menu = Menu.buildFromTemplate([
  {
    label: "file",
    submenu: [
      {
        label: "Quitter",
        click: () => {
          app.quit();
        }
      }
    ]
  }
]);

Menu.setApplicationMenu(menu);


 