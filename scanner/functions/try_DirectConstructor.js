function try_DirectConstructor()
  {
    switch (l1)
    {
    case 54:                        // '<'
      try_DirElemConstructor();
      break;
    case 55:                        // '<!--'
      try_DirCommentConstructor();
      break;
    default:
      try_DirPIConstructor();
    }
  }