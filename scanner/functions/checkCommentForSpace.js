function checkCommentForSpace(node) {
                const type = node.type.toLowerCase(), rule = styleRules[type], commentIdentifier = type === "block" ? "/*" : "//";
                // Ignores empty comments and comments that consist only of a marker.
                if (node.value.length === 0 || rule.markers.has(node.value)) {
                    return;
                }
                const beginMatch = rule.beginRegex.exec(node.value);
                const endMatch = rule.endRegex.exec(node.value);
                // Checks.
                if (requireSpace) {
                    if (!beginMatch) {
                        const hasMarker = rule.captureMarker.exec(node.value);
                        const marker = hasMarker ? commentIdentifier + hasMarker[0] : commentIdentifier;
                        if (rule.hasExceptions) {
                            reportBegin(node, "expectedExceptionAfter", hasMarker, marker);
                        }
                        else {
                            reportBegin(node, "expectedSpaceAfter", hasMarker, marker);
                        }
                    }
                    if (balanced && type === "block" && !endMatch) {
                        reportEnd(node, "expectedSpaceBefore");
                    }
                }
                else {
                    if (beginMatch) {
                        if (!beginMatch[1]) {
                            reportBegin(node, "unexpectedSpaceAfter", beginMatch, commentIdentifier);
                        }
                        else {
                            reportBegin(node, "unexpectedSpaceAfterMarker", beginMatch, beginMatch[1]);
                        }
                    }
                    if (balanced && type === "block" && endMatch) {
                        reportEnd(node, "unexpectedSpaceBefore", endMatch);
                    }
                }
            }