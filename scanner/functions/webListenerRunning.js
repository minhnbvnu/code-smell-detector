function webListenerRunning() {
    num_listening++;
    if (num_listening === global.config.servers.length) {
        setProcessUid();
    }
}