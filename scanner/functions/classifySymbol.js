function classifySymbol(symbol, meaningAtPosition, checker) {
            const flags = symbol.getFlags();
            if ((flags & 2885600 /* Classifiable */) === 0 /* None */) {
                return void 0;
            }
            else if (flags & 32 /* Class */) {
                return 11 /* className */;
            }
            else if (flags & 384 /* Enum */) {
                return 12 /* enumName */;
            }
            else if (flags & 524288 /* TypeAlias */) {
                return 16 /* typeAliasName */;
            }
            else if (flags & 1536 /* Module */) {
                return meaningAtPosition & 4 /* Namespace */ || meaningAtPosition & 1 /* Value */ && hasValueSideModule(symbol) ? 14 /* moduleName */ : void 0;
            }
            else if (flags & 2097152 /* Alias */) {
                return classifySymbol(checker.getAliasedSymbol(symbol), meaningAtPosition, checker);
            }
            else if (meaningAtPosition & 2 /* Type */) {
                return flags & 64 /* Interface */ ? 13 /* interfaceName */ : flags & 262144 /* TypeParameter */ ? 15 /* typeParameterName */ : void 0;
            }
            else {
                return void 0;
            }
        }