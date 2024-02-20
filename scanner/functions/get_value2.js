function get_value2(attribute, { code, message }) {
      const { value } = attribute;
      const chunk = value[0];
      if (!chunk)
        return true;
      if (value.length > 1) {
        return component.error(attribute, { code, message });
      }
      if (chunk.type === "Text")
        return chunk.data;
      if (chunk.expression.type !== "Literal") {
        return component.error(attribute, { code, message });
      }
      return chunk.expression.value;
    }