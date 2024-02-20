function tabs_to_spaces(str) {
    return str.replace(regex_tabs, (match) => match.split("	").join("  "));
  }