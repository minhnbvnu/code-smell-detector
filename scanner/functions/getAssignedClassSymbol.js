function getAssignedClassSymbol(decl) {
                var _a2;
                const assignmentSymbol = decl && getSymbolOfExpando(decl, 
                /*allowDeclaration*/
                true);
                const prototype = (_a2 = assignmentSymbol == null ? void 0 : assignmentSymbol.exports) == null ? void 0 : _a2.get("prototype");
                const init = (prototype == null ? void 0 : prototype.valueDeclaration) && getAssignedJSPrototype(prototype.valueDeclaration);
                return init ? getSymbolOfDeclaration(init) : void 0;
            }