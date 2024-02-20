function isPatternLiteralType(type) {
                return !!(type.flags & 134217728 /* TemplateLiteral */) && every(type.types, isPatternLiteralPlaceholderType) || !!(type.flags & 268435456 /* StringMapping */) && isPatternLiteralPlaceholderType(type.type);
            }