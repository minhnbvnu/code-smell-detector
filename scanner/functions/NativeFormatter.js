function NativeFormatter(formatSettings) {
            var standardDateProps = {};
            var extendedSettings = {};
            var severity = 0;
            for (var name_1 in formatSettings) {
                if (name_1 in EXTENDED_SETTINGS_AND_SEVERITIES) {
                    extendedSettings[name_1] = formatSettings[name_1];
                    severity = Math.max(EXTENDED_SETTINGS_AND_SEVERITIES[name_1], severity);
                }
                else {
                    standardDateProps[name_1] = formatSettings[name_1];
                    if (name_1 in STANDARD_DATE_PROP_SEVERITIES) {
                        severity = Math.max(STANDARD_DATE_PROP_SEVERITIES[name_1], severity);
                    }
                }
            }
            this.standardDateProps = standardDateProps;
            this.extendedSettings = extendedSettings;
            this.severity = severity;
            this.buildFormattingFunc = memoize(buildFormattingFunc);
        }