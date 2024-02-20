function addScreenSolution(windowNumber, display) {
    newWindows[windowNumber] = new BrowserWindow({
        width: 364,
        height: 396,
        x: display.bounds.x,
        y: display.bounds.y,
        frame: false,
        backgroundColor: isDarkMode() ? "#191919" : "#fefefe",
        show: true,
        hasShadow: true,
        webPreferences: {
            nodeIntegration: true,
            webgl: false,
            contextIsolation: false,
            enableRemoteModule: true,
            spellcheck: false
        },
        titleBarStyle: "hiddenInset",
        icon: "./res/icons/wnrIcon.png",
        skipTaskbar: true
    });//optimize for cross platfrom

    newWindows[windowNumber].loadFile('placeholder.html');

    if (process.env.NODE_ENV !== "development") newWindows[windowNumber].setFocusable(false);
    newWindows[windowNumber].setFullScreen(true);
    newWindows[windowNumber].moveTop();
    newWindows[windowNumber].setAlwaysOnTop(true, "screen-saver");
}