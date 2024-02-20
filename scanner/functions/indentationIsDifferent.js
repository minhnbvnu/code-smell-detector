function indentationIsDifferent(indentationString, startLinePosition) {
                return indentationString !== sourceFile.text.substr(startLinePosition, indentationString.length);
            }