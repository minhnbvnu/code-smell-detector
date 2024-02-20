function outName(nodeId, idx)
    {
        assert (typeof nodeId == 'number' || typeof nodeId == 'string');
        return 'n' + nodeId + '_' + idx;
    }