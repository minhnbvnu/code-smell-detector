function setVarsOnNode(el, vars) {
    if (el.nodeType === 1) {
      const style = el.style;
      for (const key in vars) {
        style.setProperty(`--${key}`, vars[key]);
      }
    }
  }