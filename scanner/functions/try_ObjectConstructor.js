function try_ObjectConstructor()
  {
    shiftT(276);                    // '{'
    lookahead1W(273);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    if (l1 != 282)                  // '}'
    {
      try_PairConstructorList();
    }
    shiftT(282);                    // '}'
  }