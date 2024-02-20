function getTypeFromInference(inference) {
                return inference.candidates ? getUnionType(inference.candidates, 2 /* Subtype */) : inference.contraCandidates ? getIntersectionType(inference.contraCandidates) : void 0;
            }