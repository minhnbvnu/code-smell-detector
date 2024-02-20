function clearCommand (ev) {
        // Can't clear a server or applet panel
        if (this.app.panels().active.isServer() || this.app.panels().active.isApplet()) {
            return;
        }

        if (this.app.panels().active.clearMessages) {
            this.app.panels().active.clearMessages();
        }
    }