function getContextualCallSignature(type, node) {
                const signatures = getSignaturesOfType(type, 0 /* Call */);
                const applicableByArity = filter(signatures, (s) => !isAritySmaller(s, node));
                return applicableByArity.length === 1 ? applicableByArity[0] : getIntersectedSignatures(applicableByArity);
            }