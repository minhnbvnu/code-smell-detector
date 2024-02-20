function disjunctionToAutomata (
    astNode,
    nextTransition,
    context
)
{
    // Get group object from context.
    var group = context.groups[astNode.groupId];

    var openNode = new RegExpGroupNode(group);
    var closeNode = new RegExpNode();

    var openTransition = new RegExpGroupOpenTransition(openNode, group);
    var closeTransition = new RegExpGroupCloseTransition(closeNode, group);

    // Add the result of the compilation of each alternatives to the group node.
    if (astNode.alternatives.length > 0)
        for (var i = 0; i < astNode.alternatives.length; ++i)
            openNode.addAlternative(alternativeToAutomata(astNode.alternatives[i], closeTransition, context));
    else
        // Add directly closeTransition if no alternative to compile.
        openNode.addAlternative(closeTransition);

    // Set close node final if no next transition.
    if (nextTransition)
    {
        closeNode.transition = nextTransition;
    }
    else
    {
        closeNode.transition = new RegExpTransition(null);
        closeNode._final = true;
    }

    return openTransition;
}