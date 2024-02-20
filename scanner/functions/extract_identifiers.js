function extract_identifiers(param, nodes = []) {
    switch (param.type) {
      case "Identifier":
        nodes.push(param);
        break;
      case "MemberExpression":
        let object = param;
        while (object.type === "MemberExpression") {
          object = /** @type {any} */
          object.object;
        }
        nodes.push(
          /** @type {any} */
          object
        );
        break;
      case "ObjectPattern":
        const handle_prop = (prop) => {
          if (prop.type === "RestElement") {
            extract_identifiers(prop.argument, nodes);
          } else {
            extract_identifiers(prop.value, nodes);
          }
        };
        param.properties.forEach(handle_prop);
        break;
      case "ArrayPattern":
        const handle_element = (element) => {
          if (element)
            extract_identifiers(element, nodes);
        };
        param.elements.forEach((element) => {
          if (element) {
            handle_element(element);
          }
        });
        break;
      case "RestElement":
        extract_identifiers(param.argument, nodes);
        break;
      case "AssignmentPattern":
        extract_identifiers(param.left, nodes);
        break;
    }
    return nodes;
  }