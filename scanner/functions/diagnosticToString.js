function diagnosticToString(diag2) {
            return isArray(diag2) ? formatStringFromArgs(getLocaleSpecificMessage(diag2[0]), diag2.slice(1)) : getLocaleSpecificMessage(diag2);
        }