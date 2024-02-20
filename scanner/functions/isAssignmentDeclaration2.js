function isAssignmentDeclaration2(kind) {
                    var _a2;
                    switch (kind) {
                        case 2 /* ModuleExports */:
                            return true;
                        case 1 /* ExportsProperty */:
                        case 5 /* Property */:
                        case 6 /* Prototype */:
                        case 3 /* PrototypeProperty */:
                        case 4 /* ThisProperty */:
                            const symbol = getSymbolOfNode(left);
                            const init = getAssignedExpandoInitializer(right);
                            return !!init && isObjectLiteralExpression(init) && !!((_a2 = symbol == null ? void 0 : symbol.exports) == null ? void 0 : _a2.size);
                        default:
                            return false;
                    }
                }