function try_FTUnit()
  {
    switch (l1)
    {
    case 273:                       // 'words'
      shiftT(273);                  // 'words'
      break;
    case 232:                       // 'sentences'
      shiftT(232);                  // 'sentences'
      break;
    default:
      shiftT(205);                  // 'paragraphs'
    }
  }