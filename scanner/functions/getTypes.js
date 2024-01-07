function getTypes(data) {
    return data.map((name) => name.replace(/^function$/, 'Function'));
  }