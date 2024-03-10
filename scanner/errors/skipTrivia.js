function skipTrivia(text, pos, stopAfterLineBreak, stopAtComments, inJSDoc) {
            if (positionIsSynthesized(pos)) {
                return pos;
            }
            let canConsumeStar = false;
            while (true) {
                const ch = text.charCodeAt(pos);
                switch (ch) {
                    case 13 /* carriageReturn */:
                        if (text.charCodeAt(pos + 1) === 10 /* lineFeed */) {
                            pos++;
                        }
                    case 10 /* lineFeed */:
                        pos++;
                        if (stopAfterLineBreak) {
                            return pos;
                        }
                        canConsumeStar = !!inJSDoc;
                        continue;
                    case 9 /* tab */:
                    case 11 /* verticalTab */:
                    case 12 /* formFeed */:
                    case 32 /* space */:
                        pos++;
                        continue;
                    case 47 /* slash */:
                        if (stopAtComments) {
                            break;
                        }
                        if (text.charCodeAt(pos + 1) === 47 /* slash */) {
                            pos += 2;
                            while (pos < text.length) {
                                if (isLineBreak(text.charCodeAt(pos))) {
                                    break;
                                }
                                pos++;
                            }
                            canConsumeStar = false;
                            continue;
                        }
                        if (text.charCodeAt(pos + 1) === 42 /* asterisk */) {
                            pos += 2;
                            while (pos < text.length) {
                                if (text.charCodeAt(pos) === 42 /* asterisk */ && text.charCodeAt(pos + 1) === 47 /* slash */) {
                                    pos += 2;
                                    break;
                                }
                                pos++;
                            }
                            canConsumeStar = false;
                            continue;
                        }
                        break;
                    case 60 /* lessThan */:
                    case 124 /* bar */:
                    case 61 /* equals */:
                    case 62 /* greaterThan */:
                        if (isConflictMarkerTrivia(text, pos)) {
                            pos = scanConflictMarkerTrivia(text, pos);
                            canConsumeStar = false;
                            continue;
                        }
                        break;
                    case 35 /* hash */:
                        if (pos === 0 && isShebangTrivia(text, pos)) {
                            pos = scanShebangTrivia(text, pos);
                            canConsumeStar = false;
                            continue;
                        }
                        break;
                    case 42 /* asterisk */:
                        if (canConsumeStar) {
                            pos++;
                            canConsumeStar = false;
                            continue;
                        }
                        break;
                    default:
                        if (ch > 127 /* maxAsciiCharacter */ && isWhiteSpaceLike(ch)) {
                            pos++;
                            continue;
                        }
                        break;
                }
                return pos;
            }
        }