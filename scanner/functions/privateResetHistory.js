function privateResetHistory(f) {
            var method = f.resetHistory || f.reset;
            if (method) {
                method.call(f);
            }
        }