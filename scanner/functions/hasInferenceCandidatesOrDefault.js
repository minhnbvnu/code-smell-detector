function hasInferenceCandidatesOrDefault(info) {
                return !!(info.candidates || info.contraCandidates || hasTypeParameterDefault(info.typeParameter));
            }