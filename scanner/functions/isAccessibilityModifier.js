function isAccessibilityModifier(kind) {
            switch (kind) {
                case 123 /* PublicKeyword */:
                case 121 /* PrivateKeyword */:
                case 122 /* ProtectedKeyword */:
                    return true;
            }
            return false;
        }