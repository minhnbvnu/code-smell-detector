function walkPrototype(obj) {
      if (typeof obj !== "object") return;
      return obj.right === "prototype" ? obj : walkPrototype(obj.left);
    }