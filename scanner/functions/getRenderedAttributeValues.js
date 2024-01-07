function getRenderedAttributeValues(attribute, type) {
    const {
      ReactStable,
      ReactDOMStable,
      ReactDOMServerStable,
      ReactNext,
      ReactDOMNext,
      ReactDOMServerNext,
    } = initGlobals(attribute, type);
    const reactStableValue = getRenderedAttributeValue(
      ReactStable,
      ReactDOMStable,
      ReactDOMServerStable,
      attribute,
      type
    );
    const reactNextValue = getRenderedAttributeValue(
      ReactNext,
      ReactDOMNext,
      ReactDOMServerNext,
      attribute,
      type
    );

    let hasSameBehavior;
    if (reactStableValue.didError && reactNextValue.didError) {
      hasSameBehavior = true;
    } else if (!reactStableValue.didError && !reactNextValue.didError) {
      hasSameBehavior =
        reactStableValue.didWarn === reactNextValue.didWarn &&
        reactStableValue.canonicalResult === reactNextValue.canonicalResult &&
        reactStableValue.ssrHasSameBehavior ===
          reactNextValue.ssrHasSameBehavior;
    } else {
      hasSameBehavior = false;
    }

    return {
      reactStable: reactStableValue,
      reactNext: reactNextValue,
      hasSameBehavior,
    };
  }