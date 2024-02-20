function _processQueue(callback)
    {
        for (var i = 0; i < queue.length; ++i) {
            _process(queue[i]);
        }

        queue = [];
        callback();
    }