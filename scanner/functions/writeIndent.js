function writeIndent() {
                if (length2 > absoluteMaximumLength)
                    return;
                if (lineStart) {
                    const indentString = getIndentString(indent2);
                    if (indentString) {
                        length2 += indentString.length;
                        displayParts.push(displayPart(indentString, 16 /* space */));
                    }
                    lineStart = false;
                }
            }