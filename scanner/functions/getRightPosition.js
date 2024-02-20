function getRightPosition(timestamp, xScale, timeline) {
    let bandPosition = xScale(timestamp);
    if (bandPosition !== undefined) {
        //
        // if timestamp is in the scale, then return the position of the left side of the band
        //
        return bandPosition;
    } else {
        //
        // otherwise, find the last band that starts after timestamp (from right)
        //
        let i;
        const iz = timeline.length;
        // binary search  would be ideal
        for (i = iz - 1; i >= 0 && timeline[i] > timestamp; i--) {
            // noop
        }

        if (i < timeline.length - 1) {
            return xScale(timeline[i + 1]);
        } else {
            return xScale(timeline[i]) + xScale.bandwidth();
        }
    }
}