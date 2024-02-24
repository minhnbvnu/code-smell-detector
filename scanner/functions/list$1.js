function list$1(items, conjunction = "or") {
    if (items.length === 1)
      return items[0];
    return `${items.slice(0, -1).join(", ")} ${conjunction} ${items[items.length - 1]}`;
  }