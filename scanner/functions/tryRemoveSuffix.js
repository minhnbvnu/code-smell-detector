function tryRemoveSuffix(str, suffix) {
            return endsWith(str, suffix) ? str.slice(0, str.length - suffix.length) : void 0;
        }