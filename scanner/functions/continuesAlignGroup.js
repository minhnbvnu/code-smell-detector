function continuesAlignGroup(lastMember, candidate) {
                const groupEndLine = lastMember.loc.start.line;
                const candidateValueStartLine = (isKeyTypeNode(candidate) ? candidate.typeAnnotation : candidate).loc.start.line;
                if (candidateValueStartLine === groupEndLine) {
                    return false;
                }
                if (candidateValueStartLine - groupEndLine === 1) {
                    return true;
                }
                /*
                 * Check that the first comment is adjacent to the end of the group, the
                 * last comment is adjacent to the candidate property, and that successive
                 * comments are adjacent to each other.
                 */
                const leadingComments = sourceCode.getCommentsBefore(candidate);
                if (leadingComments.length &&
                    leadingComments[0].loc.start.line - groupEndLine <= 1 &&
                    candidateValueStartLine - at(leadingComments, -1).loc.end.line <= 1) {
                    for (let i = 1; i < leadingComments.length; i++) {
                        if (leadingComments[i].loc.start.line -
                            leadingComments[i - 1].loc.end.line >
                            1) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            }