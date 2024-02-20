function addCandidateType(usage, type) {
                if (type && !(type.flags & 1 /* Any */) && !(type.flags & 131072 /* Never */)) {
                    (usage.candidateTypes || (usage.candidateTypes = [])).push(type);
                }
            }