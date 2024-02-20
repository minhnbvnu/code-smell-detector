function indexSignaturesRelatedTo(source2, target2, sourceIsPrimitive, reportErrors2, intersectionState) {
                    if (relation === identityRelation) {
                        return indexSignaturesIdenticalTo(source2, target2);
                    }
                    const indexInfos = getIndexInfosOfType(target2);
                    const targetHasStringIndex = some(indexInfos, (info) => info.keyType === stringType);
                    let result2 = -1 /* True */;
                    for (const targetInfo of indexInfos) {
                        const related = relation !== strictSubtypeRelation && !sourceIsPrimitive && targetHasStringIndex && targetInfo.type.flags & 1 /* Any */ ? -1 /* True */ : isGenericMappedType(source2) && targetHasStringIndex ? isRelatedTo(getTemplateTypeFromMappedType(source2), targetInfo.type, 3 /* Both */, reportErrors2) : typeRelatedToIndexInfo(source2, targetInfo, reportErrors2, intersectionState);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }