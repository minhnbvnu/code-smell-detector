function unpack_destructuring({ contexts, node: node2, modifier = (node3) => node3, default_modifier = (node3) => node3, scope, component, context_rest_properties, in_rest_element = false }) {
    if (!node2)
      return;
    if (node2.type === "Identifier") {
      contexts.push({
        type: "DestructuredVariable",
        key: node2,
        modifier,
        default_modifier
      });
      if (in_rest_element) {
        context_rest_properties.set(node2.name, node2);
      }
    } else if (node2.type === "ArrayPattern") {
      node2.elements.forEach((element, i) => {
        if (!element) {
          return;
        } else if (element.type === "RestElement") {
          unpack_destructuring({
            contexts,
            node: element.argument,
            modifier: (node3) => x`${modifier(node3)}.slice(${i})`,
            default_modifier,
            scope,
            component,
            context_rest_properties,
            in_rest_element: true
          });
        } else if (element.type === "AssignmentPattern") {
          const n2 = contexts.length;
          mark_referenced(element.right, scope, component);
          unpack_destructuring({
            contexts,
            node: element.left,
            modifier: (node3) => x`${modifier(node3)}[${i}]`,
            default_modifier: (node3, to_ctx) => x`${node3} !== undefined ? ${node3} : ${update_reference(contexts, n2, element.right, to_ctx)}`,
            scope,
            component,
            context_rest_properties,
            in_rest_element
          });
        } else {
          unpack_destructuring({
            contexts,
            node: element,
            modifier: (node3) => x`${modifier(node3)}[${i}]`,
            default_modifier,
            scope,
            component,
            context_rest_properties,
            in_rest_element
          });
        }
      });
    } else if (node2.type === "ObjectPattern") {
      const used_properties = [];
      node2.properties.forEach((property) => {
        if (property.type === "RestElement") {
          unpack_destructuring({
            contexts,
            node: property.argument,
            modifier: (node3) => x`@object_without_properties(${modifier(node3)}, [${used_properties}])`,
            default_modifier,
            scope,
            component,
            context_rest_properties,
            in_rest_element: true
          });
        } else if (property.type === "Property") {
          const key = property.key;
          const value = property.value;
          let new_modifier;
          if (property.computed) {
            const property_name = component.get_unique_name("computed_property");
            contexts.push({
              type: "ComputedProperty",
              property_name,
              key
            });
            new_modifier = (node3) => x`${modifier(node3)}[${property_name}]`;
            used_properties.push(x`${property_name}`);
          } else if (key.type === "Identifier") {
            const property_name = key.name;
            new_modifier = (node3) => x`${modifier(node3)}.${property_name}`;
            used_properties.push(x`"${property_name}"`);
          } else if (key.type === "Literal") {
            const property_name = key.value;
            new_modifier = (node3) => x`${modifier(node3)}["${property_name}"]`;
            used_properties.push(x`"${property_name}"`);
          }
          if (value.type === "AssignmentPattern") {
            const n2 = contexts.length;
            mark_referenced(value.right, scope, component);
            unpack_destructuring({
              contexts,
              node: value.left,
              modifier: new_modifier,
              default_modifier: (node3, to_ctx) => x`${node3} !== undefined ? ${node3} : ${update_reference(contexts, n2, value.right, to_ctx)}`,
              scope,
              component,
              context_rest_properties,
              in_rest_element
            });
          } else {
            unpack_destructuring({
              contexts,
              node: value,
              modifier: new_modifier,
              default_modifier,
              scope,
              component,
              context_rest_properties,
              in_rest_element
            });
          }
        }
      });
    }
  }