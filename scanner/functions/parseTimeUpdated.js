function parseTimeUpdated(timeUpdatedString) {
        // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
        let timeUpdated = Date.parse(timeUpdatedString);
        if (isNaN(timeUpdated)) {
            // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/478
            timeUpdated = Date.parse(timeUpdatedString.replace(/\+(\d{2})(\d{2})$/, '+$1:$2'));
        }
        if (isNaN(timeUpdated)) {
            timeUpdated = new Date().getTime();
        }

        return timeUpdated;
    }