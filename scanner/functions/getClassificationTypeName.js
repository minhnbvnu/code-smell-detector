function getClassificationTypeName(type) {
            switch (type) {
                case 1 /* comment */:
                    return "comment" /* comment */;
                case 2 /* identifier */:
                    return "identifier" /* identifier */;
                case 3 /* keyword */:
                    return "keyword" /* keyword */;
                case 4 /* numericLiteral */:
                    return "number" /* numericLiteral */;
                case 25 /* bigintLiteral */:
                    return "bigint" /* bigintLiteral */;
                case 5 /* operator */:
                    return "operator" /* operator */;
                case 6 /* stringLiteral */:
                    return "string" /* stringLiteral */;
                case 8 /* whiteSpace */:
                    return "whitespace" /* whiteSpace */;
                case 9 /* text */:
                    return "text" /* text */;
                case 10 /* punctuation */:
                    return "punctuation" /* punctuation */;
                case 11 /* className */:
                    return "class name" /* className */;
                case 12 /* enumName */:
                    return "enum name" /* enumName */;
                case 13 /* interfaceName */:
                    return "interface name" /* interfaceName */;
                case 14 /* moduleName */:
                    return "module name" /* moduleName */;
                case 15 /* typeParameterName */:
                    return "type parameter name" /* typeParameterName */;
                case 16 /* typeAliasName */:
                    return "type alias name" /* typeAliasName */;
                case 17 /* parameterName */:
                    return "parameter name" /* parameterName */;
                case 18 /* docCommentTagName */:
                    return "doc comment tag name" /* docCommentTagName */;
                case 19 /* jsxOpenTagName */:
                    return "jsx open tag name" /* jsxOpenTagName */;
                case 20 /* jsxCloseTagName */:
                    return "jsx close tag name" /* jsxCloseTagName */;
                case 21 /* jsxSelfClosingTagName */:
                    return "jsx self closing tag name" /* jsxSelfClosingTagName */;
                case 22 /* jsxAttribute */:
                    return "jsx attribute" /* jsxAttribute */;
                case 23 /* jsxText */:
                    return "jsx text" /* jsxText */;
                case 24 /* jsxAttributeStringLiteralValue */:
                    return "jsx attribute string literal value" /* jsxAttributeStringLiteralValue */;
                default:
                    return void 0;
            }
        }