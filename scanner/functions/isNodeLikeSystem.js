function isNodeLikeSystem() {
            return typeof process !== "undefined" && process.nextTick && !process.browser && typeof module === "object";
        }