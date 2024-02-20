function hasListenerFilter(listener, capture) {
    return function(listenerSpec) {
        return (
            listenerSpec.capture === capture &&
            listenerSpec.listener === listener
        );
    };
}