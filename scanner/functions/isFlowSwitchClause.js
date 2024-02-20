function isFlowSwitchClause(f) {
                            return !!(f.flags & 128 /* SwitchClause */);
                        }