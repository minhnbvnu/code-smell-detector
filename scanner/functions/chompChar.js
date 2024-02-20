function chompChar(source, setState)
    {
      while (source.skipTo("\\'")) { source.next(); source.next(); }
      if (source.skipTo("'"))
      {
        source.next();
        setState(normal());
        return 'string';
      }
      source.skipToEnd();
      setState(normal());
      return 'error';
    }