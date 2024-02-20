function chompMultiComment(nest)
    {
      if (nest == 0)
      {
        return normal();
      }
      return function(source, setState)
      {
        while (!source.eol())
        {
          var char = source.next();
          if (char == '{' && source.eat('-'))
          {
            ++nest;
          }
          else if (char == '-' && source.eat('}'))
          {
            --nest;
            if (nest === 0)
            {
              setState(normal());
              return 'comment';
            }
          }
        }
        setState(chompMultiComment(nest));
        return 'comment';
      }
    }