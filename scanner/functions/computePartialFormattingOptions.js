function computePartialFormattingOptions(options, biggestUnit) {
        var partialOptions = {};
        for (var name_2 in options) {
            if (!(name_2 in STANDARD_DATE_PROP_SEVERITIES) || // not a date part prop (like timeZone)
                STANDARD_DATE_PROP_SEVERITIES[name_2] <= biggestUnit) {
                partialOptions[name_2] = options[name_2];
            }
        }
        return partialOptions;
    }