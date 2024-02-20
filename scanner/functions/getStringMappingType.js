function getStringMappingType(symbol, type) {
                return type.flags & (1048576 /* Union */ | 131072 /* Never */) ? mapType(type, (t) => getStringMappingType(symbol, t)) : type.flags & 128 /* StringLiteral */ ? getStringLiteralType(applyStringMapping(symbol, type.value)) : type.flags & 134217728 /* TemplateLiteral */ ? getTemplateLiteralType(...applyTemplateStringMapping(symbol, type.texts, type.types)) : (
                // Mapping<Mapping<T>> === Mapping<T>
                type.flags & 268435456 /* StringMapping */ && symbol === type.symbol ? type : type.flags & (1 /* Any */ | 4 /* String */ | 268435456 /* StringMapping */) || isGenericIndexType(type) ? getStringMappingTypeForGenericType(symbol, type) : (
                // This handles Mapping<`${number}`> and Mapping<`${bigint}`>
                isPatternLiteralPlaceholderType(type) ? getStringMappingTypeForGenericType(symbol, getTemplateLiteralType(["", ""], [type])) : type));
            }