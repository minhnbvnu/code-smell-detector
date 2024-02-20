function typeToString(type, enclosingDeclaration, flags = 1048576 /* AllowUniqueESSymbolType */ | 16384 /* UseAliasDefinedOutsideCurrentScope */, writer = createTextWriter("")) {
                const noTruncation = compilerOptions.noErrorTruncation || flags & 1 /* NoTruncation */;
                const typeNode = nodeBuilder.typeToTypeNode(type, enclosingDeclaration, toNodeBuilderFlags(flags) | 70221824 /* IgnoreErrors */ | (noTruncation ? 1 /* NoTruncation */ : 0));
                if (typeNode === void 0)
                    return Debug.fail("should always get typenode");
                const printer = type !== unresolvedType ? createPrinterWithRemoveComments() : createPrinterWithDefaults();
                const sourceFile = enclosingDeclaration && getSourceFileOfNode(enclosingDeclaration);
                printer.writeNode(4 /* Unspecified */, typeNode, 
                /*sourceFile*/
                sourceFile, writer);
                const result = writer.getText();
                const maxLength2 = noTruncation ? noTruncationMaximumTruncationLength * 2 : defaultMaximumTruncationLength * 2;
                if (maxLength2 && result && result.length >= maxLength2) {
                    return result.substr(0, maxLength2 - "...".length) + "...";
                }
                return result;
            }