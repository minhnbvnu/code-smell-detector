function someTypeRelatedToType(source2, target2, reportErrors2, intersectionState) {
                    const sourceTypes = source2.types;
                    if (source2.flags & 1048576 /* Union */ && containsType(sourceTypes, target2)) {
                        return -1 /* True */;
                    }
                    const len = sourceTypes.length;
                    for (let i = 0; i < len; i++) {
                        const related = isRelatedTo(sourceTypes[i], target2, 1 /* Source */, reportErrors2 && i === len - 1, 
                        /*headMessage*/
                        void 0, intersectionState);
                        if (related) {
                            return related;
                        }
                    }
                    return 0 /* False */;
                }