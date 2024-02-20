function canHaveSpanInParameterDeclaration(parameter) {
                    return !!parameter.initializer || parameter.dotDotDotToken !== void 0 || hasSyntacticModifier(parameter, 4 /* Public */ | 8 /* Private */);
                }