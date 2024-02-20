function inferReverseMappedType(sourceType, target, constraint) {
                const typeParameter = getIndexedAccessType(constraint.type, getTypeParameterFromMappedType(target));
                const templateType = getTemplateTypeFromMappedType(target);
                const inference = createInferenceInfo(typeParameter);
                inferTypes([inference], sourceType, templateType);
                return getTypeFromInference(inference) || unknownType;
            }