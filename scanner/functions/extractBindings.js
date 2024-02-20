function extractBindings(vars, patt) {
    switch (patt.type) {
      case OBJECT_INIT:
        patt.children.forEach(function(init) {
            extractBindings(vars, init.type === IDENTIFIER ? init : init.children[1]);
        });
        break;

      case ARRAY_INIT:
        patt.children.forEach(function(patt) {
            if (patt)
                extractBindings(vars, patt);
        });
        break;

      case IDENTIFIER:
        vars.push(id(patt, patt.value)); // FIXME: handle const
        break;
    }
}