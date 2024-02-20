function onlyWithFiles(fn) {
            return function() {
                if (!initializedOnBody) {
                    fn.apply(this, arguments);
                }
            };
        }