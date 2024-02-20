function symbolToString(symbol, enclosingDeclaration, meaning, flags = 4 /* AllowAnyNodeKind */, writer) {
                let nodeFlags = 70221824 /* IgnoreErrors */;
                if (flags & 2 /* UseOnlyExternalAliasing */) {
                    nodeFlags |= 128 /* UseOnlyExternalAliasing */;
                }
                if (flags & 1 /* WriteTypeParametersOrArguments */) {
                    nodeFlags |= 512 /* WriteTypeParametersInQualifiedName */;
                }
                if (flags & 8 /* UseAliasDefinedOutsideCurrentScope */) {
                    nodeFlags |= 16384 /* UseAliasDefinedOutsideCurrentScope */;
                }
                if (flags & 32 /* DoNotIncludeSymbolChain */) {
                    nodeFlags |= 134217728 /* DoNotIncludeSymbolChain */;
                }
                if (flags & 16 /* WriteComputedProps */) {
                    nodeFlags |= 1073741824 /* WriteComputedProps */;
                }
                const builder = flags & 4 /* AllowAnyNodeKind */ ? nodeBuilder.symbolToNode : nodeBuilder.symbolToEntityName;
                return writer ? symbolToStringWorker(writer).getText() : usingSingleLineStringWriter(symbolToStringWorker);
                function symbolToStringWorker(writer2) {
                    const entity = builder(symbol, meaning, enclosingDeclaration, nodeFlags);
                    const printer = (enclosingDeclaration == null ? void 0 : enclosingDeclaration.kind) === 308 /* SourceFile */ ? createPrinterWithRemoveCommentsNeverAsciiEscape() : createPrinterWithRemoveComments();
                    const sourceFile = enclosingDeclaration && getSourceFileOfNode(enclosingDeclaration);
                    printer.writeNode(4 /* Unspecified */, entity, 
                    /*sourceFile*/
                    sourceFile, writer2);
                    return writer2;
                }
            }