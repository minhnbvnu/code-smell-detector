function getUsageModeForExpression(usage) {
                return isStringLiteralLike(usage) ? getModeForUsageLocation(getSourceFileOfNode(usage), usage) : void 0;
            }