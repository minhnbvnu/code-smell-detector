function propagateAssignmentPatternFlags(node) {
                return containsObjectRestOrSpread(node) ? 65536 /* ContainsObjectRestOrSpread */ : 0 /* None */;
            }