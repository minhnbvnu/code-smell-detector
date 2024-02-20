function createModifiersFromModifierFlags(flags2) {
                const result = [];
                if (flags2 & 1 /* Export */)
                    result.push(createModifier(93 /* ExportKeyword */));
                if (flags2 & 2 /* Ambient */)
                    result.push(createModifier(136 /* DeclareKeyword */));
                if (flags2 & 1024 /* Default */)
                    result.push(createModifier(88 /* DefaultKeyword */));
                if (flags2 & 2048 /* Const */)
                    result.push(createModifier(85 /* ConstKeyword */));
                if (flags2 & 4 /* Public */)
                    result.push(createModifier(123 /* PublicKeyword */));
                if (flags2 & 8 /* Private */)
                    result.push(createModifier(121 /* PrivateKeyword */));
                if (flags2 & 16 /* Protected */)
                    result.push(createModifier(122 /* ProtectedKeyword */));
                if (flags2 & 256 /* Abstract */)
                    result.push(createModifier(126 /* AbstractKeyword */));
                if (flags2 & 32 /* Static */)
                    result.push(createModifier(124 /* StaticKeyword */));
                if (flags2 & 16384 /* Override */)
                    result.push(createModifier(161 /* OverrideKeyword */));
                if (flags2 & 64 /* Readonly */)
                    result.push(createModifier(146 /* ReadonlyKeyword */));
                if (flags2 & 128 /* Accessor */)
                    result.push(createModifier(127 /* AccessorKeyword */));
                if (flags2 & 512 /* Async */)
                    result.push(createModifier(132 /* AsyncKeyword */));
                if (flags2 & 32768 /* In */)
                    result.push(createModifier(101 /* InKeyword */));
                if (flags2 & 65536 /* Out */)
                    result.push(createModifier(145 /* OutKeyword */));
                return result.length ? result : void 0;
            }