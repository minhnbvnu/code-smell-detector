function definitionToReferencedSymbolDefinitionInfo(def, checker, originalNode) {
            const info = (() => {
                switch (def.type) {
                    case 0 /* Symbol */: {
                        const { symbol } = def;
                        const { displayParts: displayParts2, kind: kind2 } = getDefinitionKindAndDisplayParts(symbol, checker, originalNode);
                        const name2 = displayParts2.map((p) => p.text).join("");
                        const declaration = symbol.declarations && firstOrUndefined(symbol.declarations);
                        const node = declaration ? getNameOfDeclaration(declaration) || declaration : originalNode;
                        return {
                            ...getFileAndTextSpanFromNode(node),
                            name: name2,
                            kind: kind2,
                            displayParts: displayParts2,
                            context: getContextNode(declaration)
                        };
                    }
                    case 1 /* Label */: {
                        const { node } = def;
                        return { ...getFileAndTextSpanFromNode(node), name: node.text, kind: "label" /* label */, displayParts: [displayPart(node.text, 17 /* text */)] };
                    }
                    case 2 /* Keyword */: {
                        const { node } = def;
                        const name2 = tokenToString(node.kind);
                        return { ...getFileAndTextSpanFromNode(node), name: name2, kind: "keyword" /* keyword */, displayParts: [{ text: name2, kind: "keyword" /* keyword */ }] };
                    }
                    case 3 /* This */: {
                        const { node } = def;
                        const symbol = checker.getSymbolAtLocation(node);
                        const displayParts2 = symbol && ts_SymbolDisplay_exports.getSymbolDisplayPartsDocumentationAndSymbolKind(checker, symbol, node.getSourceFile(), getContainerNode(node), node).displayParts || [textPart("this")];
                        return { ...getFileAndTextSpanFromNode(node), name: "this", kind: "var" /* variableElement */, displayParts: displayParts2 };
                    }
                    case 4 /* String */: {
                        const { node } = def;
                        return {
                            ...getFileAndTextSpanFromNode(node),
                            name: node.text,
                            kind: "var" /* variableElement */,
                            displayParts: [displayPart(getTextOfNode(node), 8 /* stringLiteral */)]
                        };
                    }
                    case 5 /* TripleSlashReference */: {
                        return {
                            textSpan: createTextSpanFromRange(def.reference),
                            sourceFile: def.file,
                            name: def.reference.fileName,
                            kind: "string" /* string */,
                            displayParts: [displayPart(`"${def.reference.fileName}"`, 8 /* stringLiteral */)]
                        };
                    }
                    default:
                        return Debug.assertNever(def);
                }
            })();
            const { sourceFile, textSpan, name, kind, displayParts, context } = info;
            return {
                containerKind: "" /* unknown */,
                containerName: "",
                fileName: sourceFile.fileName,
                kind,
                name,
                textSpan,
                displayParts,
                ...toContextSpan(textSpan, sourceFile, context)
            };
        }