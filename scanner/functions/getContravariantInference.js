function getContravariantInference(inference) {
                return inference.priority & 416 /* PriorityImpliesCombination */ ? getIntersectionType(inference.contraCandidates) : getCommonSubtype(inference.contraCandidates);
            }