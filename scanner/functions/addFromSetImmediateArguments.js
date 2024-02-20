function addFromSetImmediateArguments(args) {
        var handler = args[0];
        args = Array.prototype.slice.call(args, 1);
        tasksByHandle[nextHandle] = function() {
            handler.apply(undefined, args);
        };
        queueTail = (queueTail.next = { handle: nextHandle++ });
        return queueTail.handle;
    }