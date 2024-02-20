function symbolPart(text, symbol) {
            return displayPart(text, displayPartKind(symbol));
            function displayPartKind(symbol2) {
                const flags = symbol2.flags;
                if (flags & 3 /* Variable */) {
                    return isFirstDeclarationOfSymbolParameter(symbol2) ? 13 /* parameterName */ : 9 /* localName */;
                }
                if (flags & 4 /* Property */)
                    return 14 /* propertyName */;
                if (flags & 32768 /* GetAccessor */)
                    return 14 /* propertyName */;
                if (flags & 65536 /* SetAccessor */)
                    return 14 /* propertyName */;
                if (flags & 8 /* EnumMember */)
                    return 19 /* enumMemberName */;
                if (flags & 16 /* Function */)
                    return 20 /* functionName */;
                if (flags & 32 /* Class */)
                    return 1 /* className */;
                if (flags & 64 /* Interface */)
                    return 4 /* interfaceName */;
                if (flags & 384 /* Enum */)
                    return 2 /* enumName */;
                if (flags & 1536 /* Module */)
                    return 11 /* moduleName */;
                if (flags & 8192 /* Method */)
                    return 10 /* methodName */;
                if (flags & 262144 /* TypeParameter */)
                    return 18 /* typeParameterName */;
                if (flags & 524288 /* TypeAlias */)
                    return 0 /* aliasName */;
                if (flags & 2097152 /* Alias */)
                    return 0 /* aliasName */;
                return 17 /* text */;
            }
        }