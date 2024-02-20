function isLargeIdContinue(cp) {
        return isInRange(cp, largeIdContinueRanges !== null && largeIdContinueRanges !== void 0 ? largeIdContinueRanges : (largeIdContinueRanges = initLargeIdContinueRanges()));
    }