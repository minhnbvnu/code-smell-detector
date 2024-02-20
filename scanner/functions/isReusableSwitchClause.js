function isReusableSwitchClause(node) {
                        if (node) {
                            switch (node.kind) {
                                case 292 /* CaseClause */:
                                case 293 /* DefaultClause */:
                                    return true;
                            }
                        }
                        return false;
                    }