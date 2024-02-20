function split_bool(split_str) {
    and_split = split_str.split(' AND ');

    if (and_split[0]) {
      return and_split[0];
    }

    return null;
}