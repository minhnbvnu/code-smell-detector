function getTodoCommentsRegExp() {
                    const singleLineCommentStart = /(?:\/\/+\s*)/.source;
                    const multiLineCommentStart = /(?:\/\*+\s*)/.source;
                    const anyNumberOfSpacesAndAsterisksAtStartOfLine = /(?:^(?:\s|\*)*)/.source;
                    const preamble = "(" + anyNumberOfSpacesAndAsterisksAtStartOfLine + "|" + singleLineCommentStart + "|" + multiLineCommentStart + ")";
                    const literals = "(?:" + map(descriptors, (d) => "(" + escapeRegExp(d.text) + ")").join("|") + ")";
                    const endOfLineOrEndOfComment = /(?:$|\*\/)/.source;
                    const messageRemainder = /(?:.*?)/.source;
                    const messagePortion = "(" + literals + messageRemainder + ")";
                    const regExpString = preamble + messagePortion + endOfLineOrEndOfComment;
                    return new RegExp(regExpString, "gim");
                }