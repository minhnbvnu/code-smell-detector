function testBasic(a, b) {
    eqAll("x", a, b);
    a.setValue("hey");
    eqAll("hey", a, b);
    b.setValue("wow");
    eqAll("wow", a, b);
    a.replaceRange("u\nv\nw", Pos(0, 3));
    b.replaceRange("i", Pos(0, 4));
    b.replaceRange("j", Pos(2, 1));
    eqAll("wowui\nv\nwj", a, b);
  }