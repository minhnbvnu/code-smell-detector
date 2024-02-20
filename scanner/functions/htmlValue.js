function htmlValue(value) {
      if (value instanceof HTMLTemplateElement) {
        return /** @type {!HTMLTemplateElement } */(value).innerHTML;
      } else if (value instanceof LiteralString) {
        return literalValue(value);
      } else {
        throw new Error(`non-template value passed to Polymer.html: ${value}`);
      }
    }