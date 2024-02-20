function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = flushQueue;
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
    }