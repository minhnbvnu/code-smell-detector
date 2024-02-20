function getEpoch(epoch) {
        if (!epoch) {
            return 0;
        }
        if (typeof epoch.getTime === "function") {
            return epoch.getTime();
        }
        if (typeof epoch === "number") {
            return epoch;
        }
        throw new TypeError("now should be milliseconds since UNIX epoch");
    }