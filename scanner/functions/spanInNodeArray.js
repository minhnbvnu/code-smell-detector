function spanInNodeArray(nodeArray, node, match) {
                if (nodeArray) {
                    const index = nodeArray.indexOf(node);
                    if (index >= 0) {
                        let start = index;
                        let end = index + 1;
                        while (start > 0 && match(nodeArray[start - 1]))
                            start--;
                        while (end < nodeArray.length && match(nodeArray[end]))
                            end++;
                        return createTextSpanFromBounds(skipTrivia(sourceFile.text, nodeArray[start].pos), nodeArray[end - 1].end);
                    }
                }
                return textSpan(node);
            }