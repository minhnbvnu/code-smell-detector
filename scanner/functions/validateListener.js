function validateListener(listener) {
        return typeof listener !== "undefined" && (typeof listener === "function" || typeof listener === "object" && listener !== null && "handleEvent" in listener && typeof listener.handleEvent === "function");
      }