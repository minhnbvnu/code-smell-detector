function consider(str, delta) {
                for (var i = str.length; --i >= 0;) {
                    frequency.set(str[i], frequency.get(str[i]) + delta);
                }
            }