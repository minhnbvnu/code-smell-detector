function checkForSemicolon(node) {
                const isSemi = astUtils.isSemicolonToken(sourceCode.getLastToken(node));
                if (never) {
                    if (isSemi && canRemoveSemicolon(node)) {
                        report(node, true);
                    }
                    else if (!isSemi && beforeStatementContinuationChars === "always" &&
                        node.type !== "PropertyDefinition" &&
                        maybeAsiHazardBefore(sourceCode.getTokenAfter(node))) {
                        report(node);
                    }
                }
                else {
                    const oneLinerBlock = (exceptOneLine && isLastInOneLinerBlock(node));
                    if (isSemi && oneLinerBlock) {
                        report(node, true);
                    }
                    else if (!isSemi && !oneLinerBlock) {
                        report(node);
                    }
                }
            }