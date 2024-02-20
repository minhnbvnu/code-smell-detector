function tryComputeIndentationForListItem(startPos, endPos, parentStartLine, range, inheritedIndentation) {
                if (rangeOverlapsWithStartEnd(range, startPos, endPos) || rangeContainsStartEnd(range, startPos, endPos)) {
                    if (inheritedIndentation !== -1 /* Unknown */) {
                        return inheritedIndentation;
                    }
                }
                else {
                    const startLine = sourceFile.getLineAndCharacterOfPosition(startPos).line;
                    const startLinePosition = getLineStartPositionForPosition(startPos, sourceFile);
                    const column = SmartIndenter.findFirstNonWhitespaceColumn(startLinePosition, startPos, sourceFile, options);
                    if (startLine !== parentStartLine || startPos === column) {
                        const baseIndentSize = SmartIndenter.getBaseIndentation(options);
                        return baseIndentSize > column ? baseIndentSize : column;
                    }
                }
                return -1 /* Unknown */;
            }