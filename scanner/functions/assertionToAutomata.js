function assertionToAutomata (
    astNode,
    nextTransition,
    context
)
{
    if (astNode.value instanceof RegExpDisjunction)
    {
        var group = context.groups[astNode.value.groupId];
        var exitTransition = new RegExpLookaheadMatchTransition();
        var node = new RegExpLookaheadNode(group, astNode.positive, disjunctionToAutomata(astNode.value, exitTransition, context), nextTransition);
        exitTransition.destNode = node;
        nextTransition = new RegExpLookaheadOpenTransition(node);
    }
    else
    {
        var node = new RegExpNode();
        node.transition = nextTransition;

        if (astNode.value === 94) // '^'
        {
            if (context.multiline)
                nextTransition = new RegExpMultilineBOLAssertionTransition(node);
            else
                nextTransition = new RegExpBOLAssertionTransition(node);
        }
        else if (astNode.value === 36) // '$'
        {
            if (context.multiline)
                nextTransition = new RegExpMultilineEOLAssertionTransition(node);
            else
                nextTransition = new RegExpEOLAssertionTransition(node);
        }
        else if (astNode.value === 98) // 'b' | 'B'
        {
            nextTransition = new RegExpWordBoundaryAssertionTransition(node, astNode.positive);
        }
    }
    return nextTransition;
}