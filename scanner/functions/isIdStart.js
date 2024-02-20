function isIdStart(cp) {
        if (cp < 0x41)
            return false;
        if (cp < 0x5b)
            return true;
        if (cp < 0x61)
            return false;
        if (cp < 0x7b)
            return true;
        return isLargeIdStart(cp);
    }