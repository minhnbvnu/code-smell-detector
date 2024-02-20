function updateNeed() {
            if (0 == needNum--) {
                var args = [];
                for (var i = 0, n = names.length; i < n; i++) {
                    args[i] = require(names[i]);
                }

                onload && onload.apply(global, args);
            }
        }