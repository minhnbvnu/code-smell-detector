function multiScreenSolution(mode) {
    if (app.isReady()) {
        displays = screen.getAllDisplays();
        hasMultiDisplays = (displays.length > 1);
        try {
            let winBounds = win.getBounds();
            //get the screen that contains the window
            let distScreen = screen.getDisplayNearestPoint({ x: winBounds.x, y: winBounds.y });
            for (i in displays) {
                if (displays[i].id !== distScreen.id) {
                    if (mode === "on") {
                        addScreenSolution(i, displays[i]);
                    } else {
                        if (newWindows[i] != null) {
                            try {
                                newWindows[i].destroy();
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.log("ERR: multi screen solution failed.");
        }
    }
}