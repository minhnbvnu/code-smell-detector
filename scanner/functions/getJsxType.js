function getJsxType(name, location) {
                const namespace = getJsxNamespaceAt(location);
                const exports = namespace && getExportsOfSymbol(namespace);
                const typeSymbol = exports && getSymbol2(exports, name, 788968 /* Type */);
                return typeSymbol ? getDeclaredTypeOfSymbol(typeSymbol) : errorType;
            }