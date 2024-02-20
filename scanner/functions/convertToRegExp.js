function convertToRegExp(term) {
                const escaped = escapeRegExp(term);
                const escapedDecoration = escapeRegExp(decoration);
                /*
                 * When matching at the start, ignore leading whitespace, and
                 * there's no need to worry about word boundaries.
                 *
                 * These expressions for the prefix and suffix are designed as follows:
                 * ^   handles any terms at the beginning of a comment.
                 *     e.g. terms ["TODO"] matches `//TODO something`
                 * $   handles any terms at the end of a comment
                 *     e.g. terms ["TODO"] matches `// something TODO`
                 * \b  handles terms preceded/followed by word boundary
                 *     e.g. terms: ["!FIX", "FIX!"] matches `// FIX!something` or `// something!FIX`
                 *          terms: ["FIX"] matches `// FIX!` or `// !FIX`, but not `// fixed or affix`
                 *
                 * For location start:
                 * [\s]* handles optional leading spaces
                 *     e.g. terms ["TODO"] matches `//    TODO something`
                 * [\s\*]* (where "\*" is the escaped string of decoration)
                 *     handles optional leading spaces or decoration characters (for "start" location only)
                 *     e.g. terms ["TODO"] matches `/**** TODO something ... `
                 */
                const wordBoundary = "\\b";
                let prefix = "";
                if (location === "start") {
                    prefix = `^[\\s${escapedDecoration}]*`;
                }
                else if (/^\w/u.test(term)) {
                    prefix = wordBoundary;
                }
                const suffix = /\w$/u.test(term) ? wordBoundary : "";
                const flags = "iu"; // Case-insensitive with Unicode case folding.
                /*
                 * For location "start", the typical regex is:
                 *   /^[\s]*ESCAPED_TERM\b/iu.
                 * Or if decoration characters are specified (e.g. "*"), then any of
                 * those characters may appear in any order at the start:
                 *   /^[\s\*]*ESCAPED_TERM\b/iu.
                 *
                 * For location "anywhere" the typical regex is
                 *   /\bESCAPED_TERM\b/iu
                 *
                 * If it starts or ends with non-word character, the prefix and suffix are empty, respectively.
                 */
                return new RegExp(`${prefix}${escaped}${suffix}`, flags);
            }