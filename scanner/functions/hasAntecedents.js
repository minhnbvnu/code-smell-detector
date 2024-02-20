function hasAntecedents(f) {
                            return !!(f.flags & 12 /* Label */) && !!f.antecedents;
                        }