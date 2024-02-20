function try_JSONTest()
  {
    switch (l1)
    {
    case 167:                       // 'json-item'
      try_JSONItemTest();
      break;
    case 194:                       // 'object'
      try_JSONObjectTest();
      break;
    default:
      try_JSONArrayTest();
    }
  }