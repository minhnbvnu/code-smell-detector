function stopKeypress() {
        if (app.sounds.dtmfTone.status) {
            window.setTimeout(() => {
                app.sounds.dtmfTone.stop()
            }, 50)
        }
    }