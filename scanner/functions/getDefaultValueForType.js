function getDefaultValueForType(type) {
      if (type === "int" || type === "float") return "0";
      if (type === "boolean") return "false";
      if (type === "color") return "0x00000000";
      return "null"
    }