function canUseOriginalText(node, flags) {
            if (nodeIsSynthesized(node) || !node.parent || flags & 4 /* TerminateUnterminatedLiterals */ && node.isUnterminated) {
                return false;
            }
            if (isNumericLiteral(node) && node.numericLiteralFlags & 512 /* ContainsSeparator */) {
                return !!(flags & 8 /* AllowNumericSeparator */);
            }
            return !isBigIntLiteral(node);
        }