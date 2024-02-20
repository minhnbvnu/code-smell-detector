function walkNative(obj) {
      while (!obj.identifier && typeof obj.left === "object")
        obj = obj.left;

      if (obj.identifier && natives.indexOf(obj.value) >= 0)
        return obj.value;
    }