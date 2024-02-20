function parseGoogleCalendarId(url) {
        var match;
        // detect if the ID was specified as a single string.
        // will match calendars like "asdf1234@calendar.google.com" in addition to person email calendars.
        if (/^[^\/]+@([^\/\.]+\.)*(google|googlemail|gmail)\.com$/.test(url)) {
            return url;
        }
        else if ((match = /^https:\/\/www.googleapis.com\/calendar\/v3\/calendars\/([^\/]*)/.exec(url)) ||
            (match = /^https?:\/\/www.google.com\/calendar\/feeds\/([^\/]*)/.exec(url))) {
            return decodeURIComponent(match[1]);
        }
    }