function try_QuotAttrValueContent()
  {
    switch (l1)
    {
    case 16:                        // QuotAttrContentChar
      shiftT(16);                   // QuotAttrContentChar
      break;
    default:
      try_CommonContent();
    }
  }