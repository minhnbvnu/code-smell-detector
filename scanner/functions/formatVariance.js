function formatVariance(varianceFlags) {
                        const variance = varianceFlags & 7 /* VarianceMask */;
                        let result = variance === 0 /* Invariant */ ? "in out" : variance === 3 /* Bivariant */ ? "[bivariant]" : variance === 2 /* Contravariant */ ? "in" : variance === 1 /* Covariant */ ? "out" : variance === 4 /* Independent */ ? "[independent]" : "";
                        if (varianceFlags & 8 /* Unmeasurable */) {
                            result += " (unmeasurable)";
                        }
                        else if (varianceFlags & 16 /* Unreliable */) {
                            result += " (unreliable)";
                        }
                        return result;
                    }