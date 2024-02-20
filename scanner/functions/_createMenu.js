function _createMenu () {
  // Set up the application menu1
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          submenu: [
            {
              label: 'Article',
              accelerator: 'CommandOrControl+N',
              click () {
                _openNew('article')
              }
            },
            {
              label: 'Figure Package',
              click () {
                _openNew('figure-package')
              }
            }
          ]
        },
        {
          label: 'Open',
          accelerator: 'CommandOrControl+O',
          click () {
            _promptOpen()
          }
        },
        {
          label: 'Save',
          accelerator: 'CommandOrControl+S',
          click () {
            _save()
          }
        },
        {
          label: 'Save As...',
          accelerator: 'CommandOrControl+Shift+S',
          click () {
            _saveAs()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () {
            // TODO: why not use the globally required electron?
            shell.openExternal('http://substance.io/texture')
          }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}