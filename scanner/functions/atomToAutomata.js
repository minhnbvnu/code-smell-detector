function atomToAutomata (
    astNode,
    nextTransition,
    context
)
{
    var node = new RegExpNode();
    var atomAstNode = astNode.value;

    node.transition = nextTransition;

    /**
        RegExpPatternCharacter

          1.    _   3.
        -----> |_| ---->
                2.

        1. RegExpCharMatchTransition
        2. RegExpNode
        3. nextTransition
    */
    if (atomAstNode instanceof RegExpPatternCharacter)
    {
        var charCode = atomAstNode.value;

        if (context.ignoreCase)
            if (charCode >= 97 && charCode <= 122) // a-z
                nextTransition = new RegExpCharSetMatchTransition(node, [[charCode - 32, charCode - 32], [charCode, charCode]]);
            else if (charCode >= 65 && charCode <= 90) // A-Z
                nextTransition = new RegExpCharSetMatchTransition(node, [[charCode + 32, charCode + 32], [charCode, charCode]]);
            else
                nextTransition = new RegExpCharMatchTransition(node, charCode);
        else
            nextTransition = new RegExpCharMatchTransition(node, charCode);
    }
    /**
        RegExpCharacterClass

          1.    _   3.
        -----> |_| ---->
                2.

        1. (RegExpCharSetMatchTransition|RegExpExCharSetMatchTransition)
        2. RegExpNode
        3. nextTransition
    */
    else if (atomAstNode instanceof RegExpCharacterClass)
    {

        var ranges = getRangeFromCharClass(atomAstNode, context);
        if (atomAstNode.positive)
            nextTransition  = new RegExpCharSetMatchTransition(node, ranges);
        else
            nextTransition = new RegExpCharExSetMatchTransition(node, ranges);
    }
    /**
        RegExpBackReference

          1.    _   3.
        -----> |_| ---->
                2.

        1. RegExpBackRefMatchTransition
        2. RegExpNode
        3. nextTransition
    */
    else if (atomAstNode instanceof RegExpBackReference)
    {
        var rootGroup = context.groups[0];
        nextTransition = new RegExpBackRefMatchTransition(node, rootGroup.subcaptures[atomAstNode.index - 1]);
    }
    else if (atomAstNode instanceof RegExpDisjunction)
    {
        nextTransition = disjunctionToAutomata(atomAstNode, nextTransition, context);
    }

    return nextTransition;
}