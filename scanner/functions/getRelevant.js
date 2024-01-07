function getRelevant(data) {
  if (!data) {
    return [];
  }

  return data.trim().split(/\s+/).map(e => {
    return {
      excluded: e[0] === "-",
      viewname: e.substring(1)
    };
  });
}