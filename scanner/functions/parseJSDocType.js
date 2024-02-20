function parseJSDocType() {
                        scanner2.setInJSDocType(true);
                        const pos = getNodePos();
                        if (parseOptional(142 /* ModuleKeyword */)) {
                            const moduleTag = factory2.createJSDocNamepathType(
                            /*type*/
                            void 0);
                            terminate: while (true) {
                                switch (token()) {
                                    case 19 /* CloseBraceToken */:
                                    case 1 /* EndOfFileToken */:
                                    case 27 /* CommaToken */:
                                    case 5 /* WhitespaceTrivia */:
                                        break terminate;
                                    default:
                                        nextTokenJSDoc();
                                }
                            }
                            scanner2.setInJSDocType(false);
                            return finishNode(moduleTag, pos);
                        }
                        const hasDotDotDot = parseOptional(25 /* DotDotDotToken */);
                        let type = parseTypeOrTypePredicate();
                        scanner2.setInJSDocType(false);
                        if (hasDotDotDot) {
                            type = finishNode(factory2.createJSDocVariadicType(type), pos);
                        }
                        if (token() === 63 /* EqualsToken */) {
                            nextToken();
                            return finishNode(factory2.createJSDocOptionalType(type), pos);
                        }
                        return type;
                    }