function getTodoComments(fileName, descriptors) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                cancellationToken.throwIfCancellationRequested();
                const fileContents = sourceFile.text;
                const result = [];
                if (descriptors.length > 0 && !isNodeModulesFile(sourceFile.fileName)) {
                    const regExp = getTodoCommentsRegExp();
                    let matchArray;
                    while (matchArray = regExp.exec(fileContents)) {
                        cancellationToken.throwIfCancellationRequested();
                        const firstDescriptorCaptureIndex = 3;
                        Debug.assert(matchArray.length === descriptors.length + firstDescriptorCaptureIndex);
                        const preamble = matchArray[1];
                        const matchPosition = matchArray.index + preamble.length;
                        if (!isInComment(sourceFile, matchPosition)) {
                            continue;
                        }
                        let descriptor;
                        for (let i = 0; i < descriptors.length; i++) {
                            if (matchArray[i + firstDescriptorCaptureIndex]) {
                                descriptor = descriptors[i];
                            }
                        }
                        if (descriptor === void 0)
                            return Debug.fail();
                        if (isLetterOrDigit(fileContents.charCodeAt(matchPosition + descriptor.text.length))) {
                            continue;
                        }
                        const message = matchArray[2];
                        result.push({ descriptor, message, position: matchPosition });
                    }
                }
                return result;
                function escapeRegExp(str) {
                    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                }
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
                function isLetterOrDigit(char) {
                    return char >= 97 /* a */ && char <= 122 /* z */ || char >= 65 /* A */ && char <= 90 /* Z */ || char >= 48 /* _0 */ && char <= 57 /* _9 */;
                }
                function isNodeModulesFile(path) {
                    return stringContains(path, "/node_modules/");
                }
            }