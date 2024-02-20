function parseJSONSync(jsonText, options) {
    try {
      const json = JSON.parse(jsonText);
      if (options.json?.table) {
        return getFirstArray(json) || json;
      }
      return json;
    } catch (error) {
      throw new Error("JSONLoader: failed to parse JSON");
    }
  }