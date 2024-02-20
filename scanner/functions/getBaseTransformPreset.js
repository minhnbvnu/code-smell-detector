function getBaseTransformPreset(prefixIdentifiers) {
    return [
      [
        transformOnce,
        transformIf,
        transformMemo,
        transformFor,
        ...[],
        ...[transformExpression] ,
        transformSlotOutlet,
        transformElement,
        trackSlotScopes,
        transformText
      ],
      {
        on: transformOn$1,
        bind: transformBind,
        model: transformModel$1
      }
    ];
  }