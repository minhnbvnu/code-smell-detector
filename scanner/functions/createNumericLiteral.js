function createNumericLiteral(value, numericLiteralFlags = 0 /* None */) {
                const node = createBaseDeclaration(8 /* NumericLiteral */);
                node.text = typeof value === "number" ? value + "" : value;
                node.numericLiteralFlags = numericLiteralFlags;
                if (numericLiteralFlags & 384 /* BinaryOrOctalSpecifier */)
                    node.transformFlags |= 1024 /* ContainsES2015 */;
                return node;
            }