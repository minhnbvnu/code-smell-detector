function element_interactivity(tag_name, attribute_map) {
    if (interactive_element_role_schemas.some((schema) => match_schema(schema, tag_name, attribute_map))) {
      return ElementInteractivity.Interactive;
    }
    if (tag_name !== "header" && non_interactive_element_role_schemas.some((schema) => match_schema(schema, tag_name, attribute_map))) {
      return ElementInteractivity.NonInteractive;
    }
    if (interactive_element_ax_object_schemas.some((schema) => match_schema(schema, tag_name, attribute_map))) {
      return ElementInteractivity.Interactive;
    }
    if (non_interactive_element_ax_object_schemas.some((schema) => match_schema(schema, tag_name, attribute_map))) {
      return ElementInteractivity.NonInteractive;
    }
    return ElementInteractivity.Static;
  }