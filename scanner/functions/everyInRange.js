function everyInRange(start, end, pred) {
            for (let i = start; i < end; i++) {
                if (!pred(i)) {
                    return false;
                }
            }
            return true;
        }