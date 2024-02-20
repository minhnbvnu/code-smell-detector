function _defaultCheckSelection (t, sel) {
    t.deepEqual({
      type: sel.type,
      nodeId: sel.getNodeId()
    }, {
      type: 'property',
      nodeId: _getModelId()
    }, 'a field in the new entity should be selected')
  }