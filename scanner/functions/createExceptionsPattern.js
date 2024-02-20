function createExceptionsPattern(exceptions) {
        let pattern = "";
        /*
         * A space or an exception pattern sequence.
         * []                 ==> "\s"
         * ["-"]              ==> "(?:\s|\-+$)"
         * ["-", "="]         ==> "(?:\s|(?:\-+|=+)$)"
         * ["-", "=", "--=="] ==> "(?:\s|(?:\-+|=+|(?:\-\-==)+)$)" ==> https://jex.im/regulex/#!embed=false&flags=&re=(%3F%3A%5Cs%7C(%3F%3A%5C-%2B%7C%3D%2B%7C(%3F%3A%5C-%5C-%3D%3D)%2B)%24)
         */
        if (exceptions.length === 0) {
            // a space.
            pattern += "\\s";
        }
        else {
            // a space or...
            pattern += "(?:\\s|";
            if (exceptions.length === 1) {
                // a sequence of the exception pattern.
                pattern += escapeAndRepeat(exceptions[0]);
            }
            else {
                // a sequence of one of the exception patterns.
                pattern += "(?:";
                pattern += exceptions.map(escapeAndRepeat).join("|");
                pattern += ")";
            }
            pattern += `(?:$|[${Array.from(astUtils.LINEBREAKS).join("")}]))`;
        }
        return pattern;
    }