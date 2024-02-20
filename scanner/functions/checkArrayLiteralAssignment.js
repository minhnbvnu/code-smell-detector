function checkArrayLiteralAssignment(node, sourceType, checkMode) {
                const elements = node.elements;
                if (languageVersion < 2 /* ES2015 */ && compilerOptions.downlevelIteration) {
                    checkExternalEmitHelpers(node, 512 /* Read */);
                }
                const possiblyOutOfBoundsType = checkIteratedTypeOrElementType(65 /* Destructuring */ | 128 /* PossiblyOutOfBounds */, sourceType, undefinedType, node) || errorType;
                let inBoundsType = compilerOptions.noUncheckedIndexedAccess ? void 0 : possiblyOutOfBoundsType;
                for (let i = 0; i < elements.length; i++) {
                    let type = possiblyOutOfBoundsType;
                    if (node.elements[i].kind === 227 /* SpreadElement */) {
                        type = inBoundsType = inBoundsType != null ? inBoundsType : checkIteratedTypeOrElementType(65 /* Destructuring */, sourceType, undefinedType, node) || errorType;
                    }
                    checkArrayLiteralDestructuringElementAssignment(node, sourceType, i, type, checkMode);
                }
                return sourceType;
            }