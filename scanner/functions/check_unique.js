function check_unique(name3) {
      if (unique_names.has(name3)) {
        parser.error(parser_errors.duplicate_attribute, start);
      }
      unique_names.add(name3);
    }