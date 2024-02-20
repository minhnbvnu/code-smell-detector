function drawComponents() {
    var source = dispatchPushEvents(getDumpURL());

    customElements.whenDefined("dashboard-connstatus").then((el) => {
        let connstatus = document.getElementsByTagName(
            "dashboard-connstatus"
        )[0];
        connstatus.message("Connecting...");
        source.onopen = () => connstatus.message("Live");
        source.onerror = (err) => connstatus.message("Disconnected");
    });
}