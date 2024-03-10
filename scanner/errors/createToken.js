function createToken(token) {
                Debug.assert(token >= 0 /* FirstToken */ && token <= 162 /* LastToken */, "Invalid token");
                Debug.assert(token <= 14 /* FirstTemplateToken */ || token >= 17 /* LastTemplateToken */, "Invalid token. Use 'createTemplateLiteralLikeNode' to create template literals.");
                Debug.assert(token <= 8 /* FirstLiteralToken */ || token >= 14 /* LastLiteralToken */, "Invalid token. Use 'createLiteralLikeNode' to create literals.");
                Debug.assert(token !== 79 /* Identifier */, "Invalid token. Use 'createIdentifier' to create identifiers");
                const node = createBaseToken(token);
                let transformFlags = 0 /* None */;
                switch (token) {
                    case 132 /* AsyncKeyword */:
                        transformFlags = 256 /* ContainsES2017 */ | 128 /* ContainsES2018 */;
                        break;
                    case 123 /* PublicKeyword */:
                    case 121 /* PrivateKeyword */:
                    case 122 /* ProtectedKeyword */:
                    case 146 /* ReadonlyKeyword */:
                    case 126 /* AbstractKeyword */:
                    case 136 /* DeclareKeyword */:
                    case 85 /* ConstKeyword */:
                    case 131 /* AnyKeyword */:
                    case 148 /* NumberKeyword */:
                    case 160 /* BigIntKeyword */:
                    case 144 /* NeverKeyword */:
                    case 149 /* ObjectKeyword */:
                    case 101 /* InKeyword */:
                    case 145 /* OutKeyword */:
                    case 161 /* OverrideKeyword */:
                    case 152 /* StringKeyword */:
                    case 134 /* BooleanKeyword */:
                    case 153 /* SymbolKeyword */:
                    case 114 /* VoidKeyword */:
                    case 157 /* UnknownKeyword */:
                    case 155 /* UndefinedKeyword */:
                        transformFlags = 1 /* ContainsTypeScript */;
                        break;
                    case 106 /* SuperKeyword */:
                        transformFlags = 1024 /* ContainsES2015 */ | 134217728 /* ContainsLexicalSuper */;
                        node.flowNode = void 0;
                        break;
                    case 124 /* StaticKeyword */:
                        transformFlags = 1024 /* ContainsES2015 */;
                        break;
                    case 127 /* AccessorKeyword */:
                        transformFlags = 16777216 /* ContainsClassFields */;
                        break;
                    case 108 /* ThisKeyword */:
                        transformFlags = 16384 /* ContainsLexicalThis */;
                        node.flowNode = void 0;
                        break;
                }
                if (transformFlags) {
                    node.transformFlags |= transformFlags;
                }
                return node;
            }