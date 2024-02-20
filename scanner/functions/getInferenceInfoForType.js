function getInferenceInfoForType(type) {
                    if (type.flags & 8650752 /* TypeVariable */) {
                        for (const inference of inferences) {
                            if (type === inference.typeParameter) {
                                return inference;
                            }
                        }
                    }
                    return void 0;
                }