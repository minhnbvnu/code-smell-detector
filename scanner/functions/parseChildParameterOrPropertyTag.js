function parseChildParameterOrPropertyTag(target, indent2, name) {
                                let canParseTag = true;
                                let seenAsterisk = false;
                                while (true) {
                                    switch (nextTokenJSDoc()) {
                                        case 59 /* AtToken */:
                                            if (canParseTag) {
                                                const child = tryParseChildTag(target, indent2);
                                                if (child && (child.kind === 344 /* JSDocParameterTag */ || child.kind === 351 /* JSDocPropertyTag */) && target !== 4 /* CallbackParameter */ && name && (isIdentifier(child.name) || !escapedTextsEqual(name, child.name.left))) {
                                                    return false;
                                                }
                                                return child;
                                            }
                                            seenAsterisk = false;
                                            break;
                                        case 4 /* NewLineTrivia */:
                                            canParseTag = true;
                                            seenAsterisk = false;
                                            break;
                                        case 41 /* AsteriskToken */:
                                            if (seenAsterisk) {
                                                canParseTag = false;
                                            }
                                            seenAsterisk = true;
                                            break;
                                        case 79 /* Identifier */:
                                            canParseTag = false;
                                            break;
                                        case 1 /* EndOfFileToken */:
                                            return false;
                                    }
                                }
                            }