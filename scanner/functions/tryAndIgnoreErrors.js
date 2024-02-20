function tryAndIgnoreErrors(cb) {
            try {
                return cb();
            }
            catch (e) {
                return void 0;
            }
        }