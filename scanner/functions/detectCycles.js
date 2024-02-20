function detectCycles(graph)
{
    try
    {
        topoSort(splitNodes(graph));
        // A graph sorted with no issues has no cycle
        return false;
    }
    catch (err)
    {
        // The only error thrown from topoSort is the SyntaxError, indicating a cycle
        return true;
    }
}