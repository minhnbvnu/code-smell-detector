function measureStyle(agent, bridge, resolveNativeStyle, id, rendererID) {
  const data = agent.getInstanceAndStyle({
    id,
    rendererID
  });

  if (!data || !data.style) {
    bridge.send('NativeStyleEditor_styleAndLayout', {
      id,
      layout: null,
      style: null
    });
    return;
  }

  const {
    instance,
    style
  } = data;
  let resolvedStyle = resolveNativeStyle(style); // If it's a host component we edited before, amend styles.

  const styleOverrides = componentIDToStyleOverrides.get(id);

  if (styleOverrides != null) {
    resolvedStyle = Object.assign({}, resolvedStyle, styleOverrides);
  }

  if (!instance || typeof instance.measure !== 'function') {
    bridge.send('NativeStyleEditor_styleAndLayout', {
      id,
      layout: null,
      style: resolvedStyle || null
    });
    return;
  }

  instance.measure((x, y, width, height, left, top) => {
    // RN Android sometimes returns undefined here. Don't send measurements in this case.
    // https://github.com/jhen0409/react-native-debugger/issues/84#issuecomment-304611817
    if (typeof x !== 'number') {
      bridge.send('NativeStyleEditor_styleAndLayout', {
        id,
        layout: null,
        style: resolvedStyle || null
      });
      return;
    }

    const margin = resolvedStyle != null && resolveBoxStyle('margin', resolvedStyle) || EMPTY_BOX_STYLE;
    const padding = resolvedStyle != null && resolveBoxStyle('padding', resolvedStyle) || EMPTY_BOX_STYLE;
    bridge.send('NativeStyleEditor_styleAndLayout', {
      id,
      layout: {
        x,
        y,
        width,
        height,
        left,
        top,
        margin,
        padding
      },
      style: resolvedStyle || null
    });
  });
}