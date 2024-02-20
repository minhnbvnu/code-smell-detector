function isCompoundAssignment(kind) {
            return kind >= 64 /* FirstCompoundAssignment */ && kind <= 78 /* LastCompoundAssignment */;
        }