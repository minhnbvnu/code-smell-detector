function cloneInferenceInfo(inference) {
                return {
                    typeParameter: inference.typeParameter,
                    candidates: inference.candidates && inference.candidates.slice(),
                    contraCandidates: inference.contraCandidates && inference.contraCandidates.slice(),
                    inferredType: inference.inferredType,
                    priority: inference.priority,
                    topLevel: inference.topLevel,
                    isFixed: inference.isFixed,
                    impliedArity: inference.impliedArity
                };
            }