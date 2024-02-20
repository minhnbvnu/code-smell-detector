function drained() {
            if (queue.idle()) {
                return new Promise(function (resolve) {
                    resolve();
                });
            }
            var previousDrain = queue.drain;
            var p = new Promise(function (resolve) {
                queue.drain = function () {
                    previousDrain();
                    resolve();
                };
            });
            return p;
        }