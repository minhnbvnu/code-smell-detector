function addDomListener(object, key, eventName, selector, callback, context, info) {
  const def = initSeemple(object);
  const propDef = defineProp(object, key);

  const domEventHandler = createDomEventHandler({
    key,
    object,
    callback,
    context: context || object
  });

  // making possible to remove this event listener
  domEventHandler._callback = callback;

  const eventNamespace = def.id + key;
  const fullEventName = `${eventName}.${eventNamespace}`;
  const { bindHandler, unbindHandler } = createBindingHandlers({
    fullEventName,
    domEventHandler,
    selector
  });
  const addBindListenerResult = addListener(object, `bind:${key}`, bindHandler, context, info);
  const addUnbindListenerResult = addListener(object, `unbind:${key}`, unbindHandler, context, info);

  // if events are added successfully then run bindHandler for every node immediately
  // TODO: Describe why do we need addBindListenerResult and addUnbindListenerResult
  if (addBindListenerResult && addUnbindListenerResult) {
    const { bindings } = propDef;
    if (bindings) {
      forEach(bindings, ({ node }) => bindHandler({ node }));
    }
  }

  return object;
}