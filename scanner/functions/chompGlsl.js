function chompGlsl(source, setState)
    {
      while (!source.eol())
      {
        var char = source.next();
        if (char === '|' && source.eat(']'))
        {
          setState(normal());
          return 'string';
        }
      }
      return 'string';
    }