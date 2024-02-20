function try_AposAttrValueContent()
  {
    switch (l1)
    {
    case 17:                        // AposAttrContentChar
      shiftT(17);                   // AposAttrContentChar
      break;
    default:
      try_CommonContent();
    }
  }