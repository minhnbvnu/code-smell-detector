function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}