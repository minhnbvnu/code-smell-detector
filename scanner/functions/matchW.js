function matchW(set)
  {
    var code;
    for (;;)
    {
      code = match(set);
      if (code != 22)               // S^WS
      {
        if (code != 36)             // '(:'
        {
          break;
        }
        skip(code);
      }
    }
    return code;
  }