function try_Comment()
  {
    shiftT(36);                     // '(:'
    for (;;)
    {
      lookahead1(89);               // CommentContents | '(:' | ':)'
      if (l1 == 50)                 // ':)'
      {
        break;
      }
      switch (l1)
      {
      case 24:                      // CommentContents
        shiftT(24);                 // CommentContents
        break;
      default:
        try_Comment();
      }
    }
    shiftT(50);                     // ':)'
  }