function modifierToFlag(token) {
            switch (token) {
                case 124 /* StaticKeyword */:
                    return 32 /* Static */;
                case 123 /* PublicKeyword */:
                    return 4 /* Public */;
                case 122 /* ProtectedKeyword */:
                    return 16 /* Protected */;
                case 121 /* PrivateKeyword */:
                    return 8 /* Private */;
                case 126 /* AbstractKeyword */:
                    return 256 /* Abstract */;
                case 127 /* AccessorKeyword */:
                    return 128 /* Accessor */;
                case 93 /* ExportKeyword */:
                    return 1 /* Export */;
                case 136 /* DeclareKeyword */:
                    return 2 /* Ambient */;
                case 85 /* ConstKeyword */:
                    return 2048 /* Const */;
                case 88 /* DefaultKeyword */:
                    return 1024 /* Default */;
                case 132 /* AsyncKeyword */:
                    return 512 /* Async */;
                case 146 /* ReadonlyKeyword */:
                    return 64 /* Readonly */;
                case 161 /* OverrideKeyword */:
                    return 16384 /* Override */;
                case 101 /* InKeyword */:
                    return 32768 /* In */;
                case 145 /* OutKeyword */:
                    return 65536 /* Out */;
                case 167 /* Decorator */:
                    return 131072 /* Decorator */;
            }
            return 0 /* None */;
        }