function setProcessUid() {
    if ((global.config.group) && (global.config.group !== '')) {
        process.setgid(global.config.group);
    }
    if ((global.config.user) && (global.config.user !== '')) {
        process.setuid(global.config.user);
    }
}