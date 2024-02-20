function stringContainsAt(haystack, needle, startIndex) {
            const needleLength = needle.length;
            if (needleLength + startIndex > haystack.length) {
                return false;
            }
            for (let i = 0; i < needleLength; i++) {
                if (needle.charCodeAt(i) !== haystack.charCodeAt(i + startIndex))
                    return false;
            }
            return true;
        }