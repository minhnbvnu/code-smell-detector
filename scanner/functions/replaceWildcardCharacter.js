function replaceWildcardCharacter(match, singleAsteriskRegexFragment) {
            return match === "*" ? singleAsteriskRegexFragment : match === "?" ? "[^/]" : "\\" + match;
        }