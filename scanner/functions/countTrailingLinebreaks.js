function countTrailingLinebreaks(string) {
                const trailingWhitespace = string.match(/\s*$/u)[0];
                const linebreakMatches = trailingWhitespace.match(astUtils.createGlobalLinebreakMatcher());
                return linebreakMatches === null ? 0 : linebreakMatches.length;
            }