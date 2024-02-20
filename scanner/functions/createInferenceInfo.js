function createInferenceInfo(typeParameter) {
                return {
                    typeParameter,
                    candidates: void 0,
                    contraCandidates: void 0,
                    inferredType: void 0,
                    priority: void 0,
                    topLevel: true,
                    isFixed: false,
                    impliedArity: void 0
                };
            }