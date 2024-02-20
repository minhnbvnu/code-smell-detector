function setupExecStateEmitter(emitter, execState, eventParam) {
        var obj, events;
        try {
            obj = JSON.parse(eventParam);
            obj = obj.data;
            events = JSON.parse(obj);
        }
        catch(e) {
            events = [];
        }

        _.each(events, function(event) {
            emitter.on(event, function(packet) {
                execState.push(packet);
            });
        });
    }