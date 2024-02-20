function touchBarSolution(mode) {
    if (app.isReady()) {
        if (process.platform === "darwin") {
            try {
                if (mode === "index") {
                    let settingsSubmitter = new TouchBarButton({
                        label: i18n.__('settings'),
                        click: () => settings("normal")
                    });
                    let helperSubmitter = new TouchBarButton({
                        label: i18n.__('website'),
                        click: () => shell.openExternal('https://getwnr.com/')
                    });
                    let submitter = new TouchBarButton({
                        label: i18n.__('submitter'),
                        backgroundColor: '#5490ea',
                        click: () => win.webContents.send("submitter")
                    });
                    let touchBar = new TouchBar({
                        items: [
                            settingsSubmitter,
                            new TouchBarSpacer({ size: "small" }),
                            helperSubmitter,
                            new TouchBarSpacer({ size: "small" }),
                            submitter,
                        ]
                    });
                    if (win != null) win.setTouchBar(touchBar);
                } else if (mode === "timer") {
                    let startOrStopSubmitter = new TouchBarButton({
                        label: i18n.__('start-or-stop'),
                        click: () => win.webContents.send("start-or-stop")
                    });
                    timeLeftOnBar = new TouchBarLabel({
                        label: (1 - progress) * 100 + timeLeftTip
                    })
                    let touchBar = new TouchBar({
                        items: [
                            timeLeftOnBar
                        ]
                    });
                    touchBar.escapeItem = startOrStopSubmitter;
                    if (win != null) win.setTouchBar(touchBar);
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
}