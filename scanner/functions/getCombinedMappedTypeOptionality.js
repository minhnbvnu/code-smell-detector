function getCombinedMappedTypeOptionality(type) {
                const optionality = getMappedTypeOptionality(type);
                const modifiersType = getModifiersTypeFromMappedType(type);
                return optionality || (isGenericMappedType(modifiersType) ? getMappedTypeOptionality(modifiersType) : 0);
            }