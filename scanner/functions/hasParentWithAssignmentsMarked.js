function hasParentWithAssignmentsMarked(node) {
                return !!findAncestor(node.parent, (node2) => (isFunctionLike(node2) || isCatchClause(node2)) && !!(getNodeLinks(node2).flags & 524288 /* AssignmentsMarked */));
            }