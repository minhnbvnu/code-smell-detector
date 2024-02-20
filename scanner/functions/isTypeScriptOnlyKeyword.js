function isTypeScriptOnlyKeyword(kind) {
            switch (kind) {
                case 126 /* AbstractKeyword */:
                case 131 /* AnyKeyword */:
                case 160 /* BigIntKeyword */:
                case 134 /* BooleanKeyword */:
                case 136 /* DeclareKeyword */:
                case 92 /* EnumKeyword */:
                case 159 /* GlobalKeyword */:
                case 117 /* ImplementsKeyword */:
                case 138 /* InferKeyword */:
                case 118 /* InterfaceKeyword */:
                case 140 /* IsKeyword */:
                case 141 /* KeyOfKeyword */:
                case 142 /* ModuleKeyword */:
                case 143 /* NamespaceKeyword */:
                case 144 /* NeverKeyword */:
                case 148 /* NumberKeyword */:
                case 149 /* ObjectKeyword */:
                case 161 /* OverrideKeyword */:
                case 121 /* PrivateKeyword */:
                case 122 /* ProtectedKeyword */:
                case 123 /* PublicKeyword */:
                case 146 /* ReadonlyKeyword */:
                case 152 /* StringKeyword */:
                case 153 /* SymbolKeyword */:
                case 154 /* TypeKeyword */:
                case 156 /* UniqueKeyword */:
                case 157 /* UnknownKeyword */:
                    return true;
                default:
                    return false;
            }
        }