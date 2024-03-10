function bindSingleNode(object, {
  binder: givenBinder,
  key,
  $nodes,
  node,
  eventOptions,
  propDef
}) {
  const {
    silent,
    getValueOnBind,
    setValueOnBind,
    // TODO: We probably need some general flag to cancel or force debouncing
    // ... which overrides the following flags (something like debounceBinding)
    debounceSetValue = true,
    debounceGetValue = true,
    debounceSetValueOnBind = false,
    debounceGetValueOnBind = false,
    debounceSetValueDelay = 0,
    debounceGetValueDelay = 0,
    useExactBinder = false
  } = eventOptions;
    // create bindings array in property definition object
  const bindings = propDef.bindings = propDef.bindings || [];
  const { value } = propDef;
  const bindingOptions = {
    self: object,
    key,
    value,
    $nodes,
    node
  };
  let isUndefined = typeof value === 'undefined';
  let binder;
  let objectHandler;
  let nodeHandler;

  // do not allow to bind more than 2 nodes to "sandbox" (for all nodes)
  // and "container" (for Seemple.Array)
  if (
    bindings.length
        && (key === 'sandbox' || (object.isSeempleArray && key === 'container'))
  ) {
    throw seempleError('binding:magic_props_nodes_length');
  }

  // get actual binder
  if (givenBinder !== null) {
    // by default binder passed to bindNode is extended by default binder
    // useExactBinder turns this behavior off
    if (useExactBinder) {
      binder = givenBinder;
    } else {
      // getting default binder
      const foundBinder = lookForBinder(node);

      // if default binder is found
      if (foundBinder) {
        // extend found binder by given binder
        if (givenBinder) {
          assign(foundBinder, givenBinder);
        }

        binder = foundBinder;
      } else {
        // default binder is not found
        binder = givenBinder || {};
      }
    }
  }

  const {
    getValue, setValue, on, initialize
  } = binder;

  // call binder.initialize
  if (initialize) {
    initialize.call(node, bindingOptions);
  }

  // add needed event handlers to given node when getValue is given
  if (getValue) {
    const syncNodeHandler = createNodeHandler({
      object,
      key,
      node,
      propDef,
      binder,
      bindingOptions
    });

    let debouncedNodeHandler;

    if (debounceGetValue || debounceGetValueOnBind) {
      debouncedNodeHandler = debounce(syncNodeHandler, debounceGetValueDelay);
    }

    if (debounceGetValue) {
      nodeHandler = debouncedNodeHandler;
    } else {
      nodeHandler = syncNodeHandler;
    }

    // TODO: Throw error when "on" and maybe other binder properties has wrong type
    if (typeof on === 'function') {
      on.call(node, nodeHandler, bindingOptions);
    } else if (typeof on === 'string') {
      // addEventListener is faster than "on" method from any DOM library
      forEach(
        on.split(spaceReg),
        (evtName) => node.addEventListener(evtName, nodeHandler)
      );
    }

    if ((isUndefined && getValueOnBind !== false) || getValueOnBind === true) {
      if (debounceGetValueOnBind) {
        debouncedNodeHandler();
      } else {
        syncNodeHandler();
      }
    }

    isUndefined = typeof propDef.value === 'undefined';
  }

  // add needed event handlers to the object when setValue is given
  if (setValue) {
    const syncObjectHandler = createObjectHandler({
      node,
      propDef,
      binder,
      bindingOptions,
      eventOptions
    });

    let debouncedObjectHandler;

    if (debounceSetValue || debounceSetValueOnBind) {
      debouncedObjectHandler = debounce(syncObjectHandler, debounceSetValueDelay);
    }

    if (debounceSetValue) {
      objectHandler = debouncedObjectHandler;
    } else {
      objectHandler = syncObjectHandler;
    }

    // TODO: Is it possible to get previous value of a property?
    addListener(object, `_change:bindings:${key}`, objectHandler, null, { skipChecks: true });

    if ((!isUndefined && setValueOnBind !== false) || setValueOnBind === true) {
      if (debounceSetValueOnBind) {
        debouncedObjectHandler();
      } else {
        syncObjectHandler();
      }
    }
  }

  // add binding data to bindings array
  bindings.push({
    on,
    node,
    binder,
    objectHandler,
    nodeHandler,
    bindingOptions
  });

  // fire events
  if (!silent) {
    const extendedEventOptions = {
      key,
      node,
      ...eventOptions
    };

    triggerOne(object, `bind:${key}`, extendedEventOptions);
    triggerOne(object, 'bind', extendedEventOptions);
  }
}