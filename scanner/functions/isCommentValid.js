function isCommentValid(comment, options) {
                // 1. Check for default ignore pattern.
                if (DEFAULT_IGNORE_PATTERN.test(comment.value)) {
                    return true;
                }
                // 2. Check for custom ignore pattern.
                const commentWithoutAsterisks = comment.value
                    .replace(/\*/gu, "");
                if (options.ignorePatternRegExp && options.ignorePatternRegExp.test(commentWithoutAsterisks)) {
                    return true;
                }
                // 3. Check for inline comments.
                if (options.ignoreInlineComments && isInlineComment(comment)) {
                    return true;
                }
                // 4. Is this a consecutive comment (and are we tolerating those)?
                if (options.ignoreConsecutiveComments && isConsecutiveComment(comment)) {
                    return true;
                }
                // 5. Does the comment start with a possible URL?
                if (MAYBE_URL.test(commentWithoutAsterisks)) {
                    return true;
                }
                // 6. Is the initial word character a letter?
                const commentWordCharsOnly = commentWithoutAsterisks
                    .replace(WHITESPACE, "");
                if (commentWordCharsOnly.length === 0) {
                    return true;
                }
                const firstWordChar = commentWordCharsOnly[0];
                if (!LETTER_PATTERN.test(firstWordChar)) {
                    return true;
                }
                // 7. Check the case of the initial word character.
                const isUppercase = firstWordChar !== firstWordChar.toLocaleLowerCase(), isLowercase = firstWordChar !== firstWordChar.toLocaleUpperCase();
                if (capitalize === "always" && isLowercase) {
                    return false;
                }
                if (capitalize === "never" && isUppercase) {
                    return false;
                }
                return true;
            }