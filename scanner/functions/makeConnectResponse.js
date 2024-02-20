function makeConnectResponse() {
            const onSomething = () => ({
                addListener: function addListener() {
                },
                dispatch: function dispatch() {
                },
                hasListener: function hasListener() {
                },
                hasListeners: function hasListeners() {
                    return false;
                },
                removeListener: function removeListener() {
                },
            });

            const response = {
                name: '',
                sender: undefined,
                disconnect: function disconnect() {
                },
                onDisconnect: onSomething(),
                onMessage: onSomething(),
                postMessage: function postMessage() {
                    if (!arguments.length) {
                        throw new TypeError(`Insufficient number of arguments.`);
                    }
                    throw new Error(`Attempting to use a disconnected port object`);
                },
            };

            return response;
        }