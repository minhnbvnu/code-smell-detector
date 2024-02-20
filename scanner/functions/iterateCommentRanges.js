function iterateCommentRanges(reduce, text, pos, trailing, cb, state, initial) {
            let pendingPos;
            let pendingEnd;
            let pendingKind;
            let pendingHasTrailingNewLine;
            let hasPendingCommentRange = false;
            let collecting = trailing;
            let accumulator = initial;
            if (pos === 0) {
                collecting = true;
                const shebang = getShebang(text);
                if (shebang) {
                    pos = shebang.length;
                }
            }
            scan: while (pos >= 0 && pos < text.length) {
                const ch = text.charCodeAt(pos);
                switch (ch) {
                    case 13 /* carriageReturn */:
                        if (text.charCodeAt(pos + 1) === 10 /* lineFeed */) {
                            pos++;
                        }
                    case 10 /* lineFeed */:
                        pos++;
                        if (trailing) {
                            break scan;
                        }
                        collecting = true;
                        if (hasPendingCommentRange) {
                            pendingHasTrailingNewLine = true;
                        }
                        continue;
                    case 9 /* tab */:
                    case 11 /* verticalTab */:
                    case 12 /* formFeed */:
                    case 32 /* space */:
                        pos++;
                        continue;
                    case 47 /* slash */:
                        const nextChar = text.charCodeAt(pos + 1);
                        let hasTrailingNewLine = false;
                        if (nextChar === 47 /* slash */ || nextChar === 42 /* asterisk */) {
                            const kind = nextChar === 47 /* slash */ ? 2 /* SingleLineCommentTrivia */ : 3 /* MultiLineCommentTrivia */;
                            const startPos = pos;
                            pos += 2;
                            if (nextChar === 47 /* slash */) {
                                while (pos < text.length) {
                                    if (isLineBreak(text.charCodeAt(pos))) {
                                        hasTrailingNewLine = true;
                                        break;
                                    }
                                    pos++;
                                }
                            }
                            else {
                                while (pos < text.length) {
                                    if (text.charCodeAt(pos) === 42 /* asterisk */ && text.charCodeAt(pos + 1) === 47 /* slash */) {
                                        pos += 2;
                                        break;
                                    }
                                    pos++;
                                }
                            }
                            if (collecting) {
                                if (hasPendingCommentRange) {
                                    accumulator = cb(pendingPos, pendingEnd, pendingKind, pendingHasTrailingNewLine, state, accumulator);
                                    if (!reduce && accumulator) {
                                        return accumulator;
                                    }
                                }
                                pendingPos = startPos;
                                pendingEnd = pos;
                                pendingKind = kind;
                                pendingHasTrailingNewLine = hasTrailingNewLine;
                                hasPendingCommentRange = true;
                            }
                            continue;
                        }
                        break scan;
                    default:
                        if (ch > 127 /* maxAsciiCharacter */ && isWhiteSpaceLike(ch)) {
                            if (hasPendingCommentRange && isLineBreak(ch)) {
                                pendingHasTrailingNewLine = true;
                            }
                            pos++;
                            continue;
                        }
                        break scan;
                }
            }
            if (hasPendingCommentRange) {
                accumulator = cb(pendingPos, pendingEnd, pendingKind, pendingHasTrailingNewLine, state, accumulator);
            }
            return accumulator;
        }