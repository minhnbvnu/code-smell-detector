function isValidFormatter(entry) {
            return isValidPartialFormatter(entry) && typeof entry.from === "function";
        }