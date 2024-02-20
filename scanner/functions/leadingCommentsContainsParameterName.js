function leadingCommentsContainsParameterName(node, name) {
                if (!isIdentifierText(name, compilerOptions.target, getLanguageVariant(file.scriptKind))) {
                    return false;
                }
                const ranges = getLeadingCommentRanges(sourceFileText, node.pos);
                if (!(ranges == null ? void 0 : ranges.length)) {
                    return false;
                }
                const regex = leadingParameterNameCommentRegexFactory(name);
                return some(ranges, (range) => regex.test(sourceFileText.substring(range.pos, range.end)));
            }