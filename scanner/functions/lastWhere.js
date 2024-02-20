function lastWhere(a, pred) {
            let last2;
            for (const value of a) {
                if (!pred(value))
                    break;
                last2 = value;
            }
            return last2;
        }