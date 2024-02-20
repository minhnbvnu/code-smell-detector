function buildGroups (
    ast,
    groups,
    parents
)
{
    if (ast instanceof RegExpDisjunction)
    {
        var capture;

        if (ast.captures)
        {
            // Create a new capture object and register it to its parents
            capture = new RegExpCapture();

            for (var i = 0; i < parents.length; ++i)
                parents[i].subcaptures.push(capture);
        }

        // Create a new group object for this disjunction.
        var group = new RegExpGroup(capture);
        parents.push(group);
        groups[ast.groupId] = group;

        // Build groups for each alternatives.
        for (var i = 0; i < ast.alternatives.length; ++i)
            buildGroups(ast.alternatives[i], groups, parents);
        parents.pop();
    }
    else if (ast instanceof RegExpAlternative)
    {
        // Build groups for each terms.
        for (var i = 0; i < ast.terms.length; ++i)
        {
            buildGroups(ast.terms[i], groups, parents);
        }
    }
    else if (ast instanceof RegExpTerm)
    {
        // Call recursively if inner atom or assertion is a dijunction.
        if (ast.prefix.value instanceof RegExpDisjunction)
        {
            buildGroups(ast.prefix.value, groups, parents);
        }
    }
}