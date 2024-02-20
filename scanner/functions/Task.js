function Task() {
        this.value = null;
        this.callback = noop;
        this.next = null;
        this.release = noop;
        this.context = null;
        this.errorHandler = null;
        var self = this;
        this.worked = function worked(err, result) {
            var callback = self.callback;
            var errorHandler = self.errorHandler;
            var val = self.value;
            self.value = null;
            self.callback = noop;
            if (self.errorHandler) {
                errorHandler(err, val);
            }
            callback.call(self.context, err, result);
            self.release(self);
        };
    }