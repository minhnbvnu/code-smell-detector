function collectActions(xref, dict, eventType) {
  const actions = Object.create(null);
  const additionalActionsDicts = getInheritableProperty({
    dict,
    key: "AA",
    stopWhenFound: false
  });

  if (additionalActionsDicts) {
    for (let i = additionalActionsDicts.length - 1; i >= 0; i--) {
      const additionalActions = additionalActionsDicts[i];

      if (!(additionalActions instanceof _primitives.Dict)) {
        continue;
      }

      for (const key of additionalActions.getKeys()) {
        const action = eventType[key];

        if (!action) {
          continue;
        }

        const actionDict = additionalActions.getRaw(key);
        const parents = new _primitives.RefSet();
        const list = [];

        _collectJS(actionDict, xref, list, parents);

        if (list.length > 0) {
          actions[action] = list;
        }
      }
    }
  }

  if (dict.has("A")) {
    const actionDict = dict.get("A");
    const parents = new _primitives.RefSet();
    const list = [];

    _collectJS(actionDict, xref, list, parents);

    if (list.length > 0) {
      actions.Action = list;
    }
  }

  return (0, _util.objectSize)(actions) > 0 ? actions : null;
}