function getCSSWidth(stat, endStat) {
        var width = ((perf.timing[endStat] - perf.timing[stat]) / (totalTime)) * 100.0;
        // Calculate relative percent (same as sql panel logic)
        width = 100.0 * width / (100.0 - getLeft(stat));
        return (width < 1) ? "2px" : width + "%";
    }