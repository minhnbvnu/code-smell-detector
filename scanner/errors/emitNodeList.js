function emitNodeList(emit2, parentNode, children, format, parenthesizerRule, start = 0, count = children ? children.length - start : 0) {
                const isUndefined = children === void 0;
                if (isUndefined && format & 16384 /* OptionalIfUndefined */) {
                    return;
                }
                const isEmpty = children === void 0 || start >= children.length || count === 0;
                if (isEmpty && format & 32768 /* OptionalIfEmpty */) {
                    onBeforeEmitNodeArray == null ? void 0 : onBeforeEmitNodeArray(children);
                    onAfterEmitNodeArray == null ? void 0 : onAfterEmitNodeArray(children);
                    return;
                }
                if (format & 15360 /* BracketsMask */) {
                    writePunctuation(getOpeningBracket(format));
                    if (isEmpty && children) {
                        emitTrailingCommentsOfPosition(children.pos, 
                        /*prefixSpace*/
                        true);
                    }
                }
                onBeforeEmitNodeArray == null ? void 0 : onBeforeEmitNodeArray(children);
                if (isEmpty) {
                    if (format & 1 /* MultiLine */ && !(preserveSourceNewlines && (!parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile)))) {
                        writeLine();
                    }
                    else if (format & 256 /* SpaceBetweenBraces */ && !(format & 524288 /* NoSpaceIfEmpty */)) {
                        writeSpace();
                    }
                }
                else {
                    emitNodeListItems(emit2, parentNode, children, format, parenthesizerRule, start, count, children.hasTrailingComma, children);
                }
                onAfterEmitNodeArray == null ? void 0 : onAfterEmitNodeArray(children);
                if (format & 15360 /* BracketsMask */) {
                    if (isEmpty && children) {
                        emitLeadingCommentsOfPosition(children.end);
                    }
                    writePunctuation(getClosingBracket(format));
                }
            }