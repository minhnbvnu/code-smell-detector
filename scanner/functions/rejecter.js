function rejecter(value) {
            return function(dfd) {
                return dfd.callback(function() {
                    throw new Error(value);
                });
            }
        }