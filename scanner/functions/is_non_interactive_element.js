function is_non_interactive_element(tag_name, attribute_map) {
    return element_interactivity(tag_name, attribute_map) === ElementInteractivity.NonInteractive;
  }