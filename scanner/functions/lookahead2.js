function lookahead2(set)
  {
    if (l2 == 0)
    {
      l2 = match(set);
      b2 = begin;
      e2 = end;
    }
    lk = (l2 << 9) | l1;
  }