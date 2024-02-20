function notificationSolution(title, body, func) {
    if (process.env.NODE_ENV === "portable" || !Notification.isSupported()) {
        notifier.notify({
                sound: true,
                timeout: 5,
                title: title,
                message: body,
                silent: false,
                icon: path.join(__dirname, app.isPackaged ? (process.platform === "darwin" ? '../app.asar.unpacked/res/icons/iconMac.png' : '../app.asar.unpacked/res/icons/wnrIcon.png') : "/res/icons/wnrIcon.png")
            },
            function () {
                if (func === "hide-or-show" && win != null) win.show();
            }
        );
    } else {//use native notification api
        let notification = new Notification({ title: title, body: body });
        notification.once("failed", (event, error) => {
            console.log(event + error);
        });
        notification.once("click", (event) => {
            if (func === "hide-or-show" && win != null) win.show();
        });
        notification.show();
    }
}