function getAlreadyUsedTypesInStringLiteralUnion(union, current) {
            return mapDefined(union.types, (type) => type !== current && isLiteralTypeNode(type) && isStringLiteral(type.literal) ? type.literal.text : void 0);
        }