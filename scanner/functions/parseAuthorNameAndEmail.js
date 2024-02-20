function parseAuthorNameAndEmail() {
                                const comments2 = [];
                                let inEmail = false;
                                let token2 = scanner2.getToken();
                                while (token2 !== 1 /* EndOfFileToken */ && token2 !== 4 /* NewLineTrivia */) {
                                    if (token2 === 29 /* LessThanToken */) {
                                        inEmail = true;
                                    }
                                    else if (token2 === 59 /* AtToken */ && !inEmail) {
                                        break;
                                    }
                                    else if (token2 === 31 /* GreaterThanToken */ && inEmail) {
                                        comments2.push(scanner2.getTokenText());
                                        scanner2.setTextPos(scanner2.getTokenPos() + 1);
                                        break;
                                    }
                                    comments2.push(scanner2.getTokenText());
                                    token2 = nextTokenJSDoc();
                                }
                                return factory2.createJSDocText(comments2.join(""));
                            }