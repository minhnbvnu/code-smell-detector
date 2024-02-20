function toTokenRange(arg) {
            return typeof arg === "number" ? tokenRangeFrom([arg]) : isArray(arg) ? tokenRangeFrom(arg) : arg;
        }