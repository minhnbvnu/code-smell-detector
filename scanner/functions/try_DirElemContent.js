function try_DirElemContent()
  {
    switch (l1)
    {
    case 54:                        // '<'
    case 55:                        // '<!--'
    case 59:                        // '<?'
      try_DirectConstructor();
      break;
    case 4:                         // CDataSection
      shiftT(4);                    // CDataSection
      break;
    case 15:                        // ElementContentChar
      shiftT(15);                   // ElementContentChar
      break;
    default:
      try_CommonContent();
    }
  }