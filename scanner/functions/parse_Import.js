function parse_Import()
  {
    eventHandler.startNonterminal("Import", e0);
    switch (l1)
    {
    case 153:                       // 'import'
      lookahead2W(126);             // S^WS | '(:' | 'module' | 'schema'
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 115353:                    // 'import' 'schema'
      parse_SchemaImport();
      break;
    default:
      parse_ModuleImport();
    }
    eventHandler.endNonterminal("Import", e0);
  }