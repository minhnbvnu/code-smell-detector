function publishQueue(context, queue) {
        Object.defineProperty(context, gracefulQueue, {
            get: function () {
                return queue;
            }
        });
    }