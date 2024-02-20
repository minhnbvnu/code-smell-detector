function signatureRelatedTo(source2, target2, erase, reportErrors2, intersectionState, incompatibleReporter) {
                    const checkMode = relation === subtypeRelation ? 16 /* StrictTopSignature */ : relation === strictSubtypeRelation ? 16 /* StrictTopSignature */ | 8 /* StrictArity */ : 0 /* None */;
                    return compareSignaturesRelated(erase ? getErasedSignature(source2) : source2, erase ? getErasedSignature(target2) : target2, checkMode, reportErrors2, reportError, incompatibleReporter, isRelatedToWorker2, reportUnreliableMapper);
                    function isRelatedToWorker2(source3, target3, reportErrors3) {
                        return isRelatedTo(source3, target3, 3 /* Both */, reportErrors3, 
                        /*headMessage*/
                        void 0, intersectionState);
                    }
                }