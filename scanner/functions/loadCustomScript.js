function loadCustomScript(type) {
    var ScriptContent = Customcode.getValue();
    socket.emit("loadCustomScript", { "ScriptContent": ScriptContent, "type": type});
}