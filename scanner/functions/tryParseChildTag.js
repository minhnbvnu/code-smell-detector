function tryParseChildTag(target, indent2) {
                                Debug.assert(token() === 59 /* AtToken */);
                                const start2 = scanner2.getStartPos();
                                nextTokenJSDoc();
                                const tagName = parseJSDocIdentifierName();
                                skipWhitespace();
                                let t;
                                switch (tagName.escapedText) {
                                    case "type":
                                        return target === 1 /* Property */ && parseTypeTag(start2, tagName);
                                    case "prop":
                                    case "property":
                                        t = 1 /* Property */;
                                        break;
                                    case "arg":
                                    case "argument":
                                    case "param":
                                        t = 2 /* Parameter */ | 4 /* CallbackParameter */;
                                        break;
                                    default:
                                        return false;
                                }
                                if (!(target & t)) {
                                    return false;
                                }
                                return parseParameterOrPropertyTag(start2, tagName, target, indent2);
                            }