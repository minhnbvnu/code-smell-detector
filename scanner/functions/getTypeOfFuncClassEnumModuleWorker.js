function getTypeOfFuncClassEnumModuleWorker(symbol) {
                const declaration = symbol.valueDeclaration;
                if (symbol.flags & 1536 /* Module */ && isShorthandAmbientModuleSymbol(symbol)) {
                    return anyType;
                }
                else if (declaration && (declaration.kind === 223 /* BinaryExpression */ || isAccessExpression(declaration) && declaration.parent.kind === 223 /* BinaryExpression */)) {
                    return getWidenedTypeForAssignmentDeclaration(symbol);
                }
                else if (symbol.flags & 512 /* ValueModule */ && declaration && isSourceFile(declaration) && declaration.commonJsModuleIndicator) {
                    const resolvedModule = resolveExternalModuleSymbol(symbol);
                    if (resolvedModule !== symbol) {
                        if (!pushTypeResolution(symbol, 0 /* Type */)) {
                            return errorType;
                        }
                        const exportEquals = getMergedSymbol(symbol.exports.get("export=" /* ExportEquals */));
                        const type2 = getWidenedTypeForAssignmentDeclaration(exportEquals, exportEquals === resolvedModule ? void 0 : resolvedModule);
                        if (!popTypeResolution()) {
                            return reportCircularityError(symbol);
                        }
                        return type2;
                    }
                }
                const type = createObjectType(16 /* Anonymous */, symbol);
                if (symbol.flags & 32 /* Class */) {
                    const baseTypeVariable = getBaseTypeVariableOfClass(symbol);
                    return baseTypeVariable ? getIntersectionType([type, baseTypeVariable]) : type;
                }
                else {
                    return strictNullChecks && symbol.flags & 16777216 /* Optional */ ? getOptionalType(type) : type;
                }
            }