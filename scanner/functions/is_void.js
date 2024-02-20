function is_void(name2) {
    return void_element_names.test(name2) || name2.toLowerCase() === "!doctype";
  }