function inferToConditionalType(source, target) {
                    if (source.flags & 16777216 /* Conditional */) {
                        inferFromTypes(source.checkType, target.checkType);
                        inferFromTypes(source.extendsType, target.extendsType);
                        inferFromTypes(getTrueTypeFromConditionalType(source), getTrueTypeFromConditionalType(target));
                        inferFromTypes(getFalseTypeFromConditionalType(source), getFalseTypeFromConditionalType(target));
                    }
                    else {
                        const targetTypes = [getTrueTypeFromConditionalType(target), getFalseTypeFromConditionalType(target)];
                        inferToMultipleTypesWithPriority(source, targetTypes, target.flags, contravariant ? 64 /* ContravariantConditional */ : 0);
                    }
                }