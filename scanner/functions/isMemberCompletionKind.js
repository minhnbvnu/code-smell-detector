function isMemberCompletionKind(kind) {
            switch (kind) {
                case 0 /* ObjectPropertyDeclaration */:
                case 3 /* MemberLike */:
                case 2 /* PropertyAccess */:
                    return true;
                default:
                    return false;
            }
        }