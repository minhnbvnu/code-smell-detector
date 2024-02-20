function createAssignmentList(nodes) {
    return nodes.map(getTopAssignment).filter(Boolean)
}