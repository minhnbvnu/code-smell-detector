function addElement(type, flags, declaration) {
                    if (flags & 1 /* Required */) {
                        lastRequiredIndex = expandedFlags.length;
                    }
                    if (flags & 4 /* Rest */ && firstRestIndex < 0) {
                        firstRestIndex = expandedFlags.length;
                    }
                    if (flags & (2 /* Optional */ | 4 /* Rest */)) {
                        lastOptionalOrRestIndex = expandedFlags.length;
                    }
                    expandedTypes.push(flags & 2 /* Optional */ ? addOptionality(type, 
                    /*isProperty*/
                    true) : type);
                    expandedFlags.push(flags);
                    if (expandedDeclarations && declaration) {
                        expandedDeclarations.push(declaration);
                    }
                    else {
                        expandedDeclarations = void 0;
                    }
                }