function writeKind(text, kind) {
                if (length2 > absoluteMaximumLength)
                    return;
                writeIndent();
                length2 += text.length;
                displayParts.push(displayPart(text, kind));
            }