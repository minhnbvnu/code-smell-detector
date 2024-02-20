function isLargeIdStart(cp) {
        return isInRange(cp, largeIdStartRanges !== null && largeIdStartRanges !== void 0 ? largeIdStartRanges : (largeIdStartRanges = initLargeIdStartRanges()));
    }