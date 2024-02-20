function transformConstructorParameters(constructor, hasSynthesizedSuper) {
                return visitParameterList(constructor && !hasSynthesizedSuper ? constructor.parameters : void 0, visitor, context) || [];
            }