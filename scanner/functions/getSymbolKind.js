function getSymbolKind(typeChecker, symbol, location) {
            const result = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker, symbol, location);
            if (result !== "" /* unknown */) {
                return result;
            }
            const flags = getCombinedLocalAndExportSymbolFlags(symbol);
            if (flags & 32 /* Class */) {
                return getDeclarationOfKind(symbol, 228 /* ClassExpression */) ? "local class" /* localClassElement */ : "class" /* classElement */;
            }
            if (flags & 384 /* Enum */)
                return "enum" /* enumElement */;
            if (flags & 524288 /* TypeAlias */)
                return "type" /* typeElement */;
            if (flags & 64 /* Interface */)
                return "interface" /* interfaceElement */;
            if (flags & 262144 /* TypeParameter */)
                return "type parameter" /* typeParameterElement */;
            if (flags & 8 /* EnumMember */)
                return "enum member" /* enumMemberElement */;
            if (flags & 2097152 /* Alias */)
                return "alias" /* alias */;
            if (flags & 1536 /* Module */)
                return "module" /* moduleElement */;
            return result;
        }