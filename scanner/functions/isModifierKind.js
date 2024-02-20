function isModifierKind(token) {
            switch (token) {
                case 126 /* AbstractKeyword */:
                case 127 /* AccessorKeyword */:
                case 132 /* AsyncKeyword */:
                case 85 /* ConstKeyword */:
                case 136 /* DeclareKeyword */:
                case 88 /* DefaultKeyword */:
                case 93 /* ExportKeyword */:
                case 101 /* InKeyword */:
                case 123 /* PublicKeyword */:
                case 121 /* PrivateKeyword */:
                case 122 /* ProtectedKeyword */:
                case 146 /* ReadonlyKeyword */:
                case 124 /* StaticKeyword */:
                case 145 /* OutKeyword */:
                case 161 /* OverrideKeyword */:
                    return true;
            }
            return false;
        }