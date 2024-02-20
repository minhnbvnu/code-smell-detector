function try_Constructor()
  {
    switch (l1)
    {
    case 54:                        // '<'
    case 55:                        // '<!--'
    case 59:                        // '<?'
      try_DirectConstructor();
      break;
    default:
      try_ComputedConstructor();
    }
  }