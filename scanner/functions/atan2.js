function atan2(start, end) {
        /*
         * Calculate the angle between a line containing start and end points (composed
         * of [x, y] arrays) and the positive x-axis.
         */
        return Math.atan2(end[1] - start[1], end[0] - start[0]);
    }