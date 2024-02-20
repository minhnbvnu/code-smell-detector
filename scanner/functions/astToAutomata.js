function astToAutomata (
    ast,
    global,
    ignoreCase,
    multiline
)
{
    var headNode = new RegExpNode();
    var groups = [];
    var context;

    buildGroups(ast, groups, []);

    // Create context with flags.
    context = new AstToAutomataContext(groups, global, ignoreCase, multiline);

    // Set the transition of the head node to the result of the
    // compilation of the root disjunction.
    headNode.transition = disjunctionToAutomata(ast, false, context);

    // Create captures array formed by the capture object of the root group
    // and all its subcaptures.
    var rootGroup = groups[ast.groupId];
    var captures = [ rootGroup.capture ].concat(rootGroup.subcaptures);

    return new RegExpAutomata(headNode, captures);
}