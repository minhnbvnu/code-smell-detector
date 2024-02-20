function checkModifiers(modifiers, isConstValid) {
                        for (const modifier of modifiers) {
                            switch (modifier.kind) {
                                case 85 /* ConstKeyword */:
                                    if (isConstValid) {
                                        continue;
                                    }
                                case 123 /* PublicKeyword */:
                                case 121 /* PrivateKeyword */:
                                case 122 /* ProtectedKeyword */:
                                case 146 /* ReadonlyKeyword */:
                                case 136 /* DeclareKeyword */:
                                case 126 /* AbstractKeyword */:
                                case 161 /* OverrideKeyword */:
                                case 101 /* InKeyword */:
                                case 145 /* OutKeyword */:
                                    diagnostics.push(createDiagnosticForNode2(modifier, Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, tokenToString(modifier.kind)));
                                    break;
                                case 124 /* StaticKeyword */:
                                case 93 /* ExportKeyword */:
                                case 88 /* DefaultKeyword */:
                                case 127 /* AccessorKeyword */:
                            }
                        }
                    }