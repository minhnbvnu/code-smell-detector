function triggerBus(event, args) {
    if (listeners[event]) {
        for (let i = 0; i < listeners[event].length; i++) {
            listeners[event][i](...args)
        }
    }
}