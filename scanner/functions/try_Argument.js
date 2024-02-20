function try_Argument()
  {
    switch (l1)
    {
    case 64:                        // '?'
      try_ArgumentPlaceholder();
      break;
    default:
      try_ExprSingle();
    }
  }