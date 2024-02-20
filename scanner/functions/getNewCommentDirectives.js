function getNewCommentDirectives(oldDirectives, newDirectives, changeStart, changeRangeOldEnd, delta, oldText, newText, aggressiveChecks) {
                        if (!oldDirectives)
                            return newDirectives;
                        let commentDirectives;
                        let addedNewlyScannedDirectives = false;
                        for (const directive of oldDirectives) {
                            const { range, type } = directive;
                            if (range.end < changeStart) {
                                commentDirectives = append(commentDirectives, directive);
                            }
                            else if (range.pos > changeRangeOldEnd) {
                                addNewlyScannedDirectives();
                                const updatedDirective = {
                                    range: { pos: range.pos + delta, end: range.end + delta },
                                    type
                                };
                                commentDirectives = append(commentDirectives, updatedDirective);
                                if (aggressiveChecks) {
                                    Debug.assert(oldText.substring(range.pos, range.end) === newText.substring(updatedDirective.range.pos, updatedDirective.range.end));
                                }
                            }
                        }
                        addNewlyScannedDirectives();
                        return commentDirectives;
                        function addNewlyScannedDirectives() {
                            if (addedNewlyScannedDirectives)
                                return;
                            addedNewlyScannedDirectives = true;
                            if (!commentDirectives) {
                                commentDirectives = newDirectives;
                            }
                            else if (newDirectives) {
                                commentDirectives.push(...newDirectives);
                            }
                        }
                    }