function tryRemovePrefix(str, prefix, getCanonicalFileName = identity) {
            return startsWith(getCanonicalFileName(str), getCanonicalFileName(prefix)) ? str.substring(prefix.length) : void 0;
        }