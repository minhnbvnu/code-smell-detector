function isClassMemberCompletionKeyword(kind) {
            switch (kind) {
                case 126 /* AbstractKeyword */:
                case 127 /* AccessorKeyword */:
                case 135 /* ConstructorKeyword */:
                case 137 /* GetKeyword */:
                case 151 /* SetKeyword */:
                case 132 /* AsyncKeyword */:
                case 136 /* DeclareKeyword */:
                case 161 /* OverrideKeyword */:
                    return true;
                default:
                    return isClassMemberModifier(kind);
            }
        }