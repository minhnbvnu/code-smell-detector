function shouldCheckNode(node) {
                        switch (node.kind) {
                            case 10 /* StringLiteral */:
                            case 8 /* NumericLiteral */:
                            case 79 /* Identifier */:
                                return true;
                        }
                        return false;
                    }