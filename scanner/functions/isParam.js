function isParam(object) {
      return (typeof object === "string" || object instanceof String || !isNaN(object));
    }