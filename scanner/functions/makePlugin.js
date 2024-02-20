function makePlugin() {
  return {
    callOrder: [],
    setOptions: stub('setOptions'),
    stringBefore: stub('stringBefore', true),
    stringAfter: stub('stringAfter', true),
    tokenBefore: stub('tokenBefore'),
    tokenAfter: stub('tokenAfter'),
    nodeBefore: stub('nodeBefore'),
    nodeAfter: stub('nodeAfter'),
    transformAfter: stub('transformAfter'),
    transformBefore: stub('transformBefore')
  };
}