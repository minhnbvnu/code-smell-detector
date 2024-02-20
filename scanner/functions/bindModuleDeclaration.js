function bindModuleDeclaration(node) {
                setExportContextFlag(node);
                if (isAmbientModule(node)) {
                    if (hasSyntacticModifier(node, 1 /* Export */)) {
                        errorOnFirstToken(node, Diagnostics.export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always_visible);
                    }
                    if (isModuleAugmentationExternal(node)) {
                        declareModuleSymbol(node);
                    }
                    else {
                        let pattern;
                        if (node.name.kind === 10 /* StringLiteral */) {
                            const { text } = node.name;
                            pattern = tryParsePattern(text);
                            if (pattern === void 0) {
                                errorOnFirstToken(node.name, Diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, text);
                            }
                        }
                        const symbol = declareSymbolAndAddToSymbolTable(node, 512 /* ValueModule */, 110735 /* ValueModuleExcludes */);
                        file.patternAmbientModules = append(file.patternAmbientModules, pattern && !isString(pattern) ? { pattern, symbol } : void 0);
                    }
                }
                else {
                    const state = declareModuleSymbol(node);
                    if (state !== 0 /* NonInstantiated */) {
                        const { symbol } = node;
                        symbol.constEnumOnlyModule = !(symbol.flags & (16 /* Function */ | 32 /* Class */ | 256 /* RegularEnum */)) && state === 2 /* ConstEnumOnly */ && symbol.constEnumOnlyModule !== false;
                    }
                }
            }