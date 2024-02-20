function addRange(to, from, start, end) {
            if (from === void 0 || from.length === 0)
                return to;
            if (to === void 0)
                return from.slice(start, end);
            start = start === void 0 ? 0 : toOffset(from, start);
            end = end === void 0 ? from.length : toOffset(from, end);
            for (let i = start; i < end && i < from.length; i++) {
                if (from[i] !== void 0) {
                    to.push(from[i]);
                }
            }
            return to;
        }