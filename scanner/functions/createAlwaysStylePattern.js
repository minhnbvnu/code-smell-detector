function createAlwaysStylePattern(markers, exceptions) {
        let pattern = "^";
        /*
         * A marker or nothing.
         * ["*"]            ==> "\*?"
         * ["*", "!"]       ==> "(?:\*|!)?"
         * ["*", "/", "!<"] ==> "(?:\*|\/|(?:!<))?" ==> https://jex.im/regulex/#!embed=false&flags=&re=(%3F%3A%5C*%7C%5C%2F%7C(%3F%3A!%3C))%3F
         */
        if (markers.length === 1) {
            // the marker.
            pattern += escape(markers[0]);
        }
        else {
            // one of markers.
            pattern += "(?:";
            pattern += markers.map(escape).join("|");
            pattern += ")";
        }
        pattern += "?"; // or nothing.
        pattern += createExceptionsPattern(exceptions);
        return new RegExp(pattern, "u");
    }