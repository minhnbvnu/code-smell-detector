function convertClassification(type) {
            switch (type) {
                case 1 /* comment */:
                    return 3 /* Comment */;
                case 3 /* keyword */:
                    return 1 /* Keyword */;
                case 4 /* numericLiteral */:
                    return 6 /* NumberLiteral */;
                case 25 /* bigintLiteral */:
                    return 7 /* BigIntLiteral */;
                case 5 /* operator */:
                    return 2 /* Operator */;
                case 6 /* stringLiteral */:
                    return 8 /* StringLiteral */;
                case 8 /* whiteSpace */:
                    return 4 /* Whitespace */;
                case 10 /* punctuation */:
                    return 0 /* Punctuation */;
                case 2 /* identifier */:
                case 11 /* className */:
                case 12 /* enumName */:
                case 13 /* interfaceName */:
                case 14 /* moduleName */:
                case 15 /* typeParameterName */:
                case 16 /* typeAliasName */:
                case 9 /* text */:
                case 17 /* parameterName */:
                    return 5 /* Identifier */;
                default:
                    return void 0;
            }
        }