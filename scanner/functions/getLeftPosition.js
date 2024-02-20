function getLeftPosition(timestamp, xScale, timeline) {
    let bandPosition = xScale(timestamp);
    if (bandPosition !== undefined) {
        //
        // if timestamp is in the scale, then return the position of the left side of the band
        //
        return bandPosition;
    } else {
        //
        // otherwise, find the first band that starts before timestamp (from left)
        //
        let i;
        const iz = timeline.length;
        // binary search  would be ideal
        for (i = 0; i < iz && timeline[i] < timestamp; i++) {
            // noop
        }

        return xScale(timeline[i - 1]);
    }
}