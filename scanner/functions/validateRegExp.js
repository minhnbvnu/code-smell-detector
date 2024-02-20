function validateRegExp(pattern, flags, node) {
            if (typeof pattern === "string") {
                if (hasPattern(pattern, REGEXP_NAMED_GROUP)) {
                    report(node, "regexpNamedCaptureGroups")
                }
                if (hasPattern(pattern, REGEXP_LOOKBEHIND)) {
                    report(node, "regexpLookbehind")
                }
                if (hasPattern(pattern, REGEXP_UNICODE_PROPERTY)) {
                    report(node, "regexpUnicodeProperties")
                }
            }
            if (typeof flags === "string") {
                if (flags.indexOf("y") !== -1) {
                    report(node, "regexpY")
                }
                if (flags.indexOf("u") !== -1) {
                    report(node, "regexpU")
                }
                if (flags.indexOf("s") !== -1) {
                    report(node, "regexpS")
                }
            }
        }