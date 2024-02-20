function alternativeToAutomata (
    astNode,
    nextTransition,
    context
)
{
    // Concatenate the result of the compilation of each terms.
    for (var i = astNode.terms.length; i > 0; --i)
        nextTransition = termToAutomata(astNode.terms[i - 1], nextTransition, context);
    return nextTransition;
}