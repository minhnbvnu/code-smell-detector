function canFollow(keyword1, keyword2) {
            if (!isAccessibilityModifier(keyword1)) {
                return true;
            }
            switch (keyword2) {
                case 137 /* GetKeyword */:
                case 151 /* SetKeyword */:
                case 135 /* ConstructorKeyword */:
                case 124 /* StaticKeyword */:
                case 127 /* AccessorKeyword */:
                    return true;
                default:
                    return false;
            }
        }