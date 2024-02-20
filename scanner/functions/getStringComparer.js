function getStringComparer(ignoreCase) {
            return ignoreCase ? compareStringsCaseInsensitive : compareStringsCaseSensitive;
        }