function convertDegreesMinutesSecondsToDecimals(degrees, minutes, seconds) {
        var result;
        result = degrees + (minutes / 60) + (seconds / 3600);
        return result;
    }