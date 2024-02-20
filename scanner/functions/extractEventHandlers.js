function extractEventHandlers(props) {
    let result = {
        eventHandlers: {},
        options: {}
    };
    for (let key in props) {
        if (ReactBrowserEventEmitter.registrationNameModules.hasOwnProperty(key)) {
            result.eventHandlers[key] = props[key];
        } else {
            result.options[key] = props[key];
        }
    }
    return result;
}