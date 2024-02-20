function forceScreenLockSolution() {
    if (isLoose || !fullScreenProtection || !isForceScreenLock || store.get("should-stop-locked") !== true) {
        return false;
    }
    try {
        if (process.platform === 'win32') {
            require('child_process').execSync('rundll32 user32.dll,LockWorkStation');
            return true;
        } else if (process.platform === 'darwin') {
            // to be implemented
            return false;
        } else if (process.platform === 'linux') {
            // for distros with systemd
            require('child_process').execSync('loginctl lock-session $(cat /proc/self/sessionid) --no-ask-password');
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}