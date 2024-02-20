function tsk_utils_have_websocket() {
    try {
        return !!window.WebSocket;
    }
    catch (e) {
        return false;
    }
}