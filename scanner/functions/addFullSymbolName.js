function addFullSymbolName(symbolToDisplay, enclosingDeclaration2) {
                let indexInfos;
                if (alias && symbolToDisplay === symbol) {
                    symbolToDisplay = alias;
                }
                if (symbolKind === "index" /* indexSignatureElement */) {
                    indexInfos = typeChecker.getIndexInfosOfIndexSymbol(symbolToDisplay);
                }
                let fullSymbolDisplayParts = [];
                if (symbolToDisplay.flags & 131072 /* Signature */ && indexInfos) {
                    if (symbolToDisplay.parent) {
                        fullSymbolDisplayParts = symbolToDisplayParts(typeChecker, symbolToDisplay.parent);
                    }
                    fullSymbolDisplayParts.push(punctuationPart(22 /* OpenBracketToken */));
                    indexInfos.forEach((info, i) => {
                        fullSymbolDisplayParts.push(...typeToDisplayParts(typeChecker, info.keyType));
                        if (i !== indexInfos.length - 1) {
                            fullSymbolDisplayParts.push(spacePart());
                            fullSymbolDisplayParts.push(punctuationPart(51 /* BarToken */));
                            fullSymbolDisplayParts.push(spacePart());
                        }
                    });
                    fullSymbolDisplayParts.push(punctuationPart(23 /* CloseBracketToken */));
                }
                else {
                    fullSymbolDisplayParts = symbolToDisplayParts(typeChecker, symbolToDisplay, enclosingDeclaration2 || sourceFile, 
                    /*meaning*/
                    void 0, 1 /* WriteTypeParametersOrArguments */ | 2 /* UseOnlyExternalAliasing */ | 4 /* AllowAnyNodeKind */);
                }
                addRange(displayParts, fullSymbolDisplayParts);
                if (symbol.flags & 16777216 /* Optional */) {
                    displayParts.push(punctuationPart(57 /* QuestionToken */));
                }
            }