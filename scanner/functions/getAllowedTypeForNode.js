function getAllowedTypeForNode(node) {
                return tsutils.isTypeFlagSet(typeChecker.getTypeAtLocation(node), ts.TypeFlags.StringLike)
                    ? AllowedType.String
                    : AllowedType.Number;
            }