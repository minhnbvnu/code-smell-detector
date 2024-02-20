function hasOverlappingInferences(a, b) {
                for (let i = 0; i < a.length; i++) {
                    if (hasInferenceCandidates(a[i]) && hasInferenceCandidates(b[i])) {
                        return true;
                    }
                }
                return false;
            }