function process_component_options(component, nodes) {
    const component_options = {
      immutable: component.compile_options.immutable || false,
      accessors: "accessors" in component.compile_options ? component.compile_options.accessors : !!component.compile_options.customElement,
      preserveWhitespace: !!component.compile_options.preserveWhitespace,
      namespace: component.compile_options.namespace
    };
    const node2 = nodes.find((node3) => node3.name === "svelte:options");
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
    if (node2) {
      node2.attributes.forEach((attribute) => {
        if (attribute.type === "Attribute") {
          const { name: name2 } = attribute;
          switch (name2) {
            case "tag": {
              const tag2 = get_value2(attribute, compiler_errors.invalid_tag_attribute);
              if (typeof tag2 !== "string" && tag2 !== null) {
                return component.error(attribute, compiler_errors.invalid_tag_attribute);
              }
              if (tag2 && !regex_valid_tag_name.test(tag2)) {
                return component.error(attribute, compiler_errors.invalid_tag_property);
              }
              if (tag2 && !component.compile_options.customElement) {
                component.warn(attribute, compiler_warnings.missing_custom_element_compile_options);
              }
              component_options.tag = tag2;
              break;
            }
            case "namespace": {
              const ns2 = get_value2(attribute, compiler_errors.invalid_namespace_attribute);
              if (typeof ns2 !== "string") {
                return component.error(attribute, compiler_errors.invalid_namespace_attribute);
              }
              if (valid_namespaces.indexOf(ns2) === -1) {
                const match = fuzzymatch(ns2, valid_namespaces);
                return component.error(attribute, compiler_errors.invalid_namespace_property(ns2, match));
              }
              component_options.namespace = ns2;
              break;
            }
            case "accessors":
            case "immutable":
            case "preserveWhitespace": {
              const value = get_value2(attribute, compiler_errors.invalid_attribute_value(name2));
              if (typeof value !== "boolean") {
                return component.error(attribute, compiler_errors.invalid_attribute_value(name2));
              }
              component_options[name2] = value;
              break;
            }
            default:
              return component.error(attribute, compiler_errors.invalid_options_attribute_unknown);
          }
        } else {
          return component.error(attribute, compiler_errors.invalid_options_attribute);
        }
      });
    }
    return component_options;
  }