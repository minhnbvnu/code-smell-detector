function isComponent(tag, props, context) {
    const options = context.options;
    if (options.isCustomElement(tag)) {
      return false;
    }
    if (tag === "component" || /^[A-Z]/.test(tag) || isCoreComponent(tag) || options.isBuiltInComponent && options.isBuiltInComponent(tag) || options.isNativeTag && !options.isNativeTag(tag)) {
      return true;
    }
    for (let i = 0; i < props.length; i++) {
      const p = props[i];
      if (p.type === 6) {
        if (p.name === "is" && p.value) {
          if (p.value.content.startsWith("vue:")) {
            return true;
          }
        }
      } else {
        if (p.name === "is") {
          return true;
        } else if (
          // :is on plain element - only treat as component in compat mode
          p.name === "bind" && isStaticArgOf(p.arg, "is") && false
        ) {
          return true;
        }
      }
    }
  }