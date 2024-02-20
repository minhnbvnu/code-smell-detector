function normalizeContainer(container) {
    if (isString(container)) {
      const res = document.querySelector(container);
      if (!res) {
        warn(
          `Failed to mount app: mount target selector "${container}" returned null.`
        );
      }
      return res;
    }
    if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
      warn(
        `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
      );
    }
    return container;
  }