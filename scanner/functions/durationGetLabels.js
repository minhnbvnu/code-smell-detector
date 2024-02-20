function durationGetLabels(token, localeData) {
        var labels = [];

        each(keys(localeData), function (localeDataKey) {
            if (localeDataKey.slice(0, 15) !== "_durationLabels") {
                return;
            }

            var labelType = localeDataKey.slice(15).toLowerCase();

            each(keys(localeData[localeDataKey]), function (labelKey) {
                if (labelKey.slice(0, 1) === token) {
                    labels.push({
                        type: labelType,
                        key: labelKey,
                        label: localeData[localeDataKey][labelKey]
                    });
                }
            });
        });

        return labels;
    }