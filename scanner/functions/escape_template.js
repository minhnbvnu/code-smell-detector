function escape_template(str) {
    return str.replace(regex_template_characters_to_escape, "\\$1");
  }