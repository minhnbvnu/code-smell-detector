function isReusableTypeMember(node) {
                        if (node) {
                            switch (node.kind) {
                                case 177 /* ConstructSignature */:
                                case 170 /* MethodSignature */:
                                case 178 /* IndexSignature */:
                                case 168 /* PropertySignature */:
                                case 176 /* CallSignature */:
                                    return true;
                            }
                        }
                        return false;
                    }