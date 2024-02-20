function dispatchDataModelEvent(event) {
    var type;

    switch (typeof event) {
        case 'string':
            type = event;
            event = { type: type };
            break;
        case 'object':
            if ('type' in event) {
                type = event.type;
                break;
            }
        // fall through
        default:
            throw new this.HypergridError('Expected data model event to be: (string | {type:string})');
    }

    if (!REGEX_DATA_EVENT_STRING.test(type)) {
        throw new this.HypergridError('Expected data model event type "' + type + '" to match ' + REGEX_DATA_EVENT_STRING + '.');
    }

    var nativeHandler = dataModelEventHandlers[event.type];
    if (nativeHandler) {
        var dispatched = nativeHandler.call(this, event);
    }

    return dispatched !== undefined ? dispatched : dispatchGridEvent.call(this, event.type, event);
}