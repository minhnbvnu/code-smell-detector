function getCompletionEntryDisplayNameForSymbol(symbol, target, origin, kind, jsxIdentifierExpected) {
            if (originIsIgnore(origin)) {
                return void 0;
            }
            const name = originIncludesSymbolName(origin) ? origin.symbolName : symbol.name;
            if (name === void 0 || symbol.flags & 1536 /* Module */ && isSingleOrDoubleQuote(name.charCodeAt(0)) || isKnownSymbol(symbol)) {
                return void 0;
            }
            const validNameResult = { name, needsConvertPropertyAccess: false };
            if (isIdentifierText(name, target, jsxIdentifierExpected ? 1 /* JSX */ : 0 /* Standard */) || symbol.valueDeclaration && isPrivateIdentifierClassElementDeclaration(symbol.valueDeclaration)) {
                return validNameResult;
            }
            switch (kind) {
                case 3 /* MemberLike */:
                    return originIsComputedPropertyName(origin) ? { name: origin.symbolName, needsConvertPropertyAccess: false } : void 0;
                case 0 /* ObjectPropertyDeclaration */:
                    return { name: JSON.stringify(name), needsConvertPropertyAccess: false };
                case 2 /* PropertyAccess */:
                case 1 /* Global */:
                    return name.charCodeAt(0) === 32 /* space */ ? void 0 : { name, needsConvertPropertyAccess: true };
                case 5 /* None */:
                case 4 /* String */:
                    return validNameResult;
                default:
                    Debug.assertNever(kind);
            }
        }