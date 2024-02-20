function try_FTPosFilter()
  {
    switch (l1)
    {
    case 202:                       // 'ordered'
      try_FTOrder();
      break;
    case 269:                       // 'window'
      try_FTWindow();
      break;
    case 117:                       // 'distance'
      try_FTDistance();
      break;
    case 115:                       // 'different'
    case 223:                       // 'same'
      try_FTScope();
      break;
    default:
      try_FTContent();
    }
  }