function parseSimpleTag(start2, createTag, tagName, margin, indentText) {
                                return finishNode(createTag(tagName, parseTrailingTagComments(start2, getNodePos(), margin, indentText)), start2);
                            }