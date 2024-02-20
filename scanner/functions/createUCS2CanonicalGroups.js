function createUCS2CanonicalGroups()
{
    var groupedCanonically = [];
    // Pass 1: populate groupedCanonically - this is mapping from canonicalized
    // values back to the set of character code that canonicalize to them.
    for (var i = 0; i <= MAX_UCS2; ++i) {
        var ch = canonicalize(i);
        if (!groupedCanonically[ch])
            groupedCanonically[ch] = [];
        groupedCanonically[ch].push(i);
    }

    return groupedCanonically;
}