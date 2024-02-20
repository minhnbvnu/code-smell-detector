function termToAutomata (
    astNode,
    nextTransition,
    context
)
{
    if (astNode.prefix instanceof RegExpAtom)
    {
        var min = astNode.quantifier.min;
        var max = astNode.quantifier.max;

        if (max < 0 || max > min)
        {
            if (astNode.prefix.value instanceof RegExpPatternCharacter ||
                astNode.prefix.value instanceof RegExpCharacterClass)
            {
                if (astNode.quantifier.greedy)
                {
                    var loopTransition = new RegExpCharMatchLoopTransition();
                    var loopNode = new RegExpCharMatchLoopNode(max - min, atomToAutomata(astNode.prefix, loopTransition, context), nextTransition);
                    loopTransition.destNode = loopNode;
                    nextTransition = new RegExpLoopOpenTransition(loopNode);
                }
                else
                {
                    var loopTransition = new RegExpCharMatchNonGreedyLoopTransition();
                    var loopNode = new RegExpCharMatchNonGreedyLoopNode(max - min, atomToAutomata(astNode.prefix, loopTransition, context), nextTransition);
                    loopTransition.destNode = loopNode;
                    nextTransition = new RegExpLoopOpenTransition(loopNode);
                }
            }
            else if (astNode.prefix.value instanceof RegExpDisjunction)
            {
                if (astNode.quantifier.greedy)
                {
                    var loopTransition = new RegExpGroupLoopTransition();
                    var loopNode = new RegExpGroupLoopNode(max - min, atomToAutomata(astNode.prefix, loopTransition, context), nextTransition);
                    loopTransition.destNode = loopNode;
                    nextTransition = new RegExpGroupLoopOpenTransition(loopNode);
                }
                else
                {
                    var loopTransition = new RegExpGroupNonGreedyLoopTransition();
                    var loopNode = new RegExpGroupNonGreedyLoopNode(max - min, atomToAutomata(astNode.prefix, loopTransition, context), nextTransition);
                    loopTransition.destNode = loopNode;
                    nextTransition = new RegExpGroupNonGreedyLoopOpenTransition(loopNode);
                }
            }
            else if (astNode.prefix.value instanceof RegExpBackReference)
            {
                if (astNode.quantifier.greedy)
                {
                    var loopTransition = new RegExpBackRefLoopTransition();
                    var loopNode = new RegExpBackRefLoopNode(max - min, atomToAutomata(astNode.prefix, loopTransition, context), nextTransition);
                    loopTransition.destNode = loopNode;
                    nextTransition = new RegExpBackRefLoopOpenTransition(loopNode);
                }
                else
                {
                    var loopTransition = new RegExpBackRefNonGreedyLoopTransition();
                    var loopNode = new RegExpBackRefNonGreedyLoopNode(max - min, atomToAutomata(astNode.prefix, loopTransition, context), nextTransition);
                    loopTransition.destNode = loopNode;
                    nextTransition = new RegExpBackRefNonGreedyLoopOpenTransition(loopNode);
                }
            }
        }

        // Concatenate atom <min> times.
        for (var i = 0; i < min; ++i)
            nextTransition = atomToAutomata(astNode.prefix, nextTransition, context);
    }
    else if (astNode.prefix instanceof RegExpAssertion)
    {
        nextTransition = assertionToAutomata(astNode.prefix, nextTransition, context);
    }
    return nextTransition;
}