function addAntecedent(label, antecedent) {
                if (!(antecedent.flags & 1 /* Unreachable */) && !contains(label.antecedents, antecedent)) {
                    (label.antecedents || (label.antecedents = [])).push(antecedent);
                    setFlowNodeReferenced(antecedent);
                }
            }