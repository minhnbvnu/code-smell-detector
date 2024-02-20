function firstOrUndefinedIterator(iter) {
            if (iter) {
                for (const value of iter) {
                    return value;
                }
            }
            return void 0;
        }