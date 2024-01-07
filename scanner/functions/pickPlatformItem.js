function pickPlatformItem(dict) {
    if (dict.has("UF")) {
      return dict.get("UF");
    } else if (dict.has("F")) {
      return dict.get("F");
    } else if (dict.has("Unix")) {
      return dict.get("Unix");
    } else if (dict.has("Mac")) {
      return dict.get("Mac");
    } else if (dict.has("DOS")) {
      return dict.get("DOS");
    }

    return null;
  }