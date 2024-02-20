function resolutionTargetHasProperty(target, propertyName) {
                switch (propertyName) {
                    case 0 /* Type */:
                        return !!getSymbolLinks(target).type;
                    case 5 /* EnumTagType */:
                        return !!getNodeLinks(target).resolvedEnumType;
                    case 2 /* DeclaredType */:
                        return !!getSymbolLinks(target).declaredType;
                    case 1 /* ResolvedBaseConstructorType */:
                        return !!target.resolvedBaseConstructorType;
                    case 3 /* ResolvedReturnType */:
                        return !!target.resolvedReturnType;
                    case 4 /* ImmediateBaseConstraint */:
                        return !!target.immediateBaseConstraint;
                    case 6 /* ResolvedTypeArguments */:
                        return !!target.resolvedTypeArguments;
                    case 7 /* ResolvedBaseTypes */:
                        return !!target.baseTypesResolved;
                    case 8 /* WriteType */:
                        return !!getSymbolLinks(target).writeType;
                    case 9 /* ParameterInitializerContainsUndefined */:
                        return getNodeLinks(target).parameterInitializerContainsUndefined !== void 0;
                }
                return Debug.assertNever(propertyName);
            }