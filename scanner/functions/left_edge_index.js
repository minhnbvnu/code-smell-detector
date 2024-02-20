function left_edge_index(point, intervals) {
        if (point < intervals[0])
            return -1;
        if (point > intervals[intervals.length - 1])
            return intervals.length;
        if (intervals.length == 1)
            // Implies point == intervals[0]
            return 0;
        let leftEdgeIndex = 0;
        let rightEdgeIndex = intervals.length - 1;
        while (rightEdgeIndex - leftEdgeIndex != 1) {
            const indexOfNumberToCompare = leftEdgeIndex + Math.floor((rightEdgeIndex - leftEdgeIndex) / 2);
            if (point >= intervals[indexOfNumberToCompare])
                leftEdgeIndex = indexOfNumberToCompare;
            else
                rightEdgeIndex = indexOfNumberToCompare;
        }
        return leftEdgeIndex;
    }