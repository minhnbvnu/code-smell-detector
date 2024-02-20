function renameStyle(agent, id, rendererID, oldName, newName, value) {
  const data = agent.getInstanceAndStyle({
    id,
    rendererID
  });

  if (!data || !data.style) {
    return;
  }

  const {
    instance,
    style
  } = data;
  const newStyle = newName ? {
    [oldName]: undefined,
    [newName]: value
  } : {
    [oldName]: undefined
  };
  let customStyle; // TODO It would be nice if the renderer interface abstracted this away somehow.

  if (instance !== null && typeof instance.setNativeProps === 'function') {
    // In the case of a host component, we need to use setNativeProps().
    // Remember to "correct" resolved styles when we read them next time.
    const styleOverrides = componentIDToStyleOverrides.get(id);

    if (!styleOverrides) {
      componentIDToStyleOverrides.set(id, newStyle);
    } else {
      Object.assign(styleOverrides, newStyle);
    } // TODO Fabric does not support setNativeProps; chat with Sebastian or Eli


    instance.setNativeProps({
      style: newStyle
    });
  } else if (Object(isArray["a" /* default */])(style)) {
    const lastIndex = style.length - 1;

    if (typeof style[lastIndex] === 'object' && !Object(isArray["a" /* default */])(style[lastIndex])) {
      customStyle = shallowClone(style[lastIndex]);
      delete customStyle[oldName];

      if (newName) {
        customStyle[newName] = value;
      } else {
        customStyle[oldName] = undefined;
      }

      agent.overrideValueAtPath({
        type: 'props',
        id,
        rendererID,
        path: ['style', lastIndex],
        value: customStyle
      });
    } else {
      agent.overrideValueAtPath({
        type: 'props',
        id,
        rendererID,
        path: ['style'],
        value: style.concat([newStyle])
      });
    }
  } else if (typeof style === 'object') {
    customStyle = shallowClone(style);
    delete customStyle[oldName];

    if (newName) {
      customStyle[newName] = value;
    } else {
      customStyle[oldName] = undefined;
    }

    agent.overrideValueAtPath({
      type: 'props',
      id,
      rendererID,
      path: ['style'],
      value: customStyle
    });
  } else {
    agent.overrideValueAtPath({
      type: 'props',
      id,
      rendererID,
      path: ['style'],
      value: [style, newStyle]
    });
  }

  agent.emit('hideNativeHighlight');
}