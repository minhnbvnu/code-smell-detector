function Initialize() {
        try {
            document.body.style.backgroundColor = "#" + UIColorToHexString(csInterface.hostEnvironment.appSkinInfo.panelBackgroundColor);
            Persistent(true);
            Register(true, gRegisteredEvents.toString());
            SetResultLabel("Initialize done");
            SetResultTime();
        } catch (e) {
            JSLogIt("InitializeCallback catch: " + e);
        }
    }