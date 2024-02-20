function initPattern(node, patIdx)
{
    // If the pattern already exists, stop
    if (node.patterns[patIdx])
        return;

    // Compute the number of rows
    let numRows;
    switch (node.type)
    {
        case 'GateSeq':
        numRows = node.numRows;
        break;

        case 'MonoSeq':
        let scaleNotes = music.genScale(node.scaleRoot, node.scaleName, node.numOctaves);
        numRows = scaleNotes.length;
        break;

        default:
        assert (false, "unknown node type in initPattern");
        break;
    }

    // Initialize an empty pattern
    let numSteps = 16;
    let grid = new Array(numSteps);

    for (let step = 0; step < grid.length; ++step)
    {
        grid[step] = new Array(numRows);
        grid[step].fill(0);
    }

    node.patterns[patIdx] = grid;
}