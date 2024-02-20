function restoreRanges(data) {
        let last = 0;
        return data.split(" ").map((s) => (last += parseInt(s, 36) | 0));
    }