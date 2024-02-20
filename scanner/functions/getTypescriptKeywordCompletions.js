function getTypescriptKeywordCompletions(keywordFilter) {
            return _keywordCompletions[keywordFilter] || (_keywordCompletions[keywordFilter] = allKeywordsCompletions().filter((entry) => {
                const kind = stringToToken(entry.name);
                switch (keywordFilter) {
                    case 0 /* None */:
                        return false;
                    case 1 /* All */:
                        return isFunctionLikeBodyKeyword(kind) || kind === 136 /* DeclareKeyword */ || kind === 142 /* ModuleKeyword */ || kind === 154 /* TypeKeyword */ || kind === 143 /* NamespaceKeyword */ || kind === 126 /* AbstractKeyword */ || isTypeKeyword(kind) && kind !== 155 /* UndefinedKeyword */;
                    case 5 /* FunctionLikeBodyKeywords */:
                        return isFunctionLikeBodyKeyword(kind);
                    case 2 /* ClassElementKeywords */:
                        return isClassMemberCompletionKeyword(kind);
                    case 3 /* InterfaceElementKeywords */:
                        return isInterfaceOrTypeLiteralCompletionKeyword(kind);
                    case 4 /* ConstructorParameterKeywords */:
                        return isParameterPropertyModifier(kind);
                    case 6 /* TypeAssertionKeywords */:
                        return isTypeKeyword(kind) || kind === 85 /* ConstKeyword */;
                    case 7 /* TypeKeywords */:
                        return isTypeKeyword(kind);
                    case 8 /* TypeKeyword */:
                        return kind === 154 /* TypeKeyword */;
                    default:
                        return Debug.assertNever(keywordFilter);
                }
            }));
        }