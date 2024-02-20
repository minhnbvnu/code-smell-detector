function reloadAttackFrame(frame) {
        console.log(`reloadAttackFrame: ${frame.getURL()}`);
        document.getElementById(frame.getId()).src = frame.getURL();
    }