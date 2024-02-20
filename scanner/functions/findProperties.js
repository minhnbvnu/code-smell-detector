function findProperties(srv, query) {
    var prefix = query.prefix,
        found = [];

    for (var prop in srv.cx.props) if (prop != "<i>" && (!prefix || prop.indexOf(prefix) === 0)) found.push(prop);

    if (query.sort !== false) found.sort(compareCompletions);
    return {
      completions: found
    };
  }