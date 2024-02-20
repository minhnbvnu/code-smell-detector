function lock(passcode, again) {
    let md5 = require('crypto-js/md5');
    if (passcode === "" || again === "") ipc.send("locker-passcode", 'empty');
    else if (!store.get('islocked')) {
        if (passcode === again) {
            store.set('lockerpasscode', md5(passcode).toString());
            store.set('islocked', true);
            ipc.send("relaunch-dialog");
        } else ipc.send("locker-passcode", 'not-same-password');
    } else {
        if (passcode === again) {
            if (passcode === store.get('lockerpasscode') || md5(passcode).toString() === store.get('lockerpasscode')) {
                store.set('islocked', false);
                ipc.send("relaunch-dialog");
            } else ipc.send("locker-passcode", 'wrong-passcode');
        } else ipc.send("locker-passcode", 'not-same-password');
    }
}